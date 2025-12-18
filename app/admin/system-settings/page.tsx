"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit, Loader2 } from "lucide-react"

interface Role {
  id: string
  name: string
  permissions: string[]
  description?: string
}

interface Integration {
  id: string
  name: string
  key: string
  provider?: string
  config?: string
  status: string
  isActive: boolean
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    systemName: "EduLMS",
    systemEmail: "admin@edulms.com",
    timeZone: "UTC",
    language: "English",
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
  })

  // Role Management State
  const [roles, setRoles] = useState<Role[]>([])
  const [loadingRoles, setLoadingRoles] = useState(false)
  const [errorRoles, setErrorRoles] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<Partial<Role>>({ name: "", permissions: [], description: "" })
  const [permissionsInput, setPermissionsInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Integration Management State
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loadingIntegrations, setLoadingIntegrations] = useState(false)
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false)
  const [currentIntegration, setCurrentIntegration] = useState<Partial<Integration>>({})
  const [configInput, setConfigInput] = useState("")

  // SMTP specific state
  const [smtpConfig, setSmtpConfig] = useState({
    host: "",
    port: "",
    user: "",
    password: "",
    fromEmail: "",
    fromName: "",
    secure: false
  })

  // Payment Gateway specific state
  const [paymentConfig, setPaymentConfig] = useState({
    activeProvider: "stripe",
    stripe: {
      mode: "test",
      test: { publishableKey: "", secretKey: "", webhookSecret: "" },
      live: { publishableKey: "", secretKey: "", webhookSecret: "" }
    },
    paypal: {
      mode: "sandbox",
      sandbox: { clientId: "", clientSecret: "" },
      live: { clientId: "", clientSecret: "" }
    }
  })

  // Fetch roles when tab changes to "roles"
  useEffect(() => {
    if (activeTab === "roles") {
      fetchRoles()
    } else if (activeTab === "integrations") {
      fetchIntegrations()
    }
  }, [activeTab])

  const fetchIntegrations = async () => {
    setLoadingIntegrations(true)
    try {
      const res = await fetch("/api/admin/integrations", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setIntegrations(data)
      } else {
        toast.error("Failed to fetch integrations")
      }
    } catch (error) {
      toast.error("Error loading integrations")
    } finally {
      setLoadingIntegrations(false)
    }
  }

  const handleSaveIntegration = async () => {
    setIsSaving(true)
    try {
      let config = {}
      
      if (currentIntegration.key === 'email_service') {
        config = smtpConfig
      } else if (currentIntegration.key === 'payment_gateway') {
        config = paymentConfig
      } else {
        try {
          config = JSON.parse(configInput || "{}")
        } catch (e) {
          toast.error("Invalid JSON configuration")
          setIsSaving(false)
          return
        }
      }

      const payload = {
        ...currentIntegration,
        config
      }

      const res = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error("Failed to save integration")

      toast.success("Integration saved")
      setIsIntegrationDialogOpen(false)
      fetchIntegrations()
    } catch (error) {
      toast.error("Error saving integration")
    } finally {
      setIsSaving(false)
    }
  }

  const openIntegrationDialog = (intg: Integration) => {
    setCurrentIntegration(intg)
    
    // Handle config parsing
    let cfg: any = intg.config || "{}"
    if (typeof cfg === 'string') {
        try {
            cfg = JSON.parse(cfg)
        } catch (e) {
            cfg = {}
        }
    }
    
    if (intg.key === 'email_service') {
        setSmtpConfig({
            host: cfg.host || "",
            port: cfg.port || "",
            user: cfg.user || "",
            password: cfg.password || "",
            fromEmail: cfg.fromEmail || "",
            fromName: cfg.fromName || "",
            secure: cfg.secure || false
        })
    } else if (intg.key === 'payment_gateway') {
        setPaymentConfig({
            activeProvider: cfg.activeProvider || "stripe",
            stripe: {
                mode: cfg.stripe?.mode || "test",
                test: {
                    publishableKey: cfg.stripe?.test?.publishableKey || "",
                    secretKey: cfg.stripe?.test?.secretKey || "",
                    webhookSecret: cfg.stripe?.test?.webhookSecret || ""
                },
                live: {
                    publishableKey: cfg.stripe?.live?.publishableKey || "",
                    secretKey: cfg.stripe?.live?.secretKey || "",
                    webhookSecret: cfg.stripe?.live?.webhookSecret || ""
                }
            },
            paypal: {
                mode: cfg.paypal?.mode || "sandbox",
                sandbox: {
                    clientId: cfg.paypal?.sandbox?.clientId || "",
                    clientSecret: cfg.paypal?.sandbox?.clientSecret || ""
                },
                live: {
                    clientId: cfg.paypal?.live?.clientId || "",
                    clientSecret: cfg.paypal?.live?.clientSecret || ""
                }
            }
        })
    } else {
        setConfigInput(JSON.stringify(cfg, null, 2))
    }
    
    setIsIntegrationDialogOpen(true)
  }

  const fetchRoles = async () => {
    setLoadingRoles(true)
    setErrorRoles(null)
    try {
      const res = await fetch("/api/admin/roles", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
           setRoles(data)
        } else {
           console.error("API returned non-array:", data)
           setErrorRoles("Invalid data format received from server")
        }
      } else {
        const err = await res.json().catch(() => ({}))
        console.error("Fetch roles failed:", err)
        setErrorRoles(`${err.error || "Failed to fetch roles"} ${err.details ? `(${err.details})` : ""}`)
        toast.error("Failed to fetch roles")
      }
    } catch (error: any) {
      console.error("Fetch roles error:", error)
      setErrorRoles(error.message || "Error loading roles")
      toast.error("Error loading roles")
    } finally {
      setLoadingRoles(false)
    }
  }

  const handleSaveRole = async () => {
    if (!currentRole.name) {
      toast.error("Role name is required")
      return
    }

    setIsSaving(true)
    try {
      // Parse permissions from string input (comma separated)
      const permissions = permissionsInput
        .split(",")
        .map(p => p.trim())
        .filter(p => p.length > 0)

      const payload = {
        name: currentRole.name,
        description: currentRole.description,
        permissions
      }

      const url = currentRole.id 
        ? `/api/admin/roles/${currentRole.id}`
        : "/api/admin/roles"
      
      const method = currentRole.id ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to save role")
      }

      toast.success(currentRole.id ? "Role updated" : "Role created")
      setIsDialogOpen(false)
      fetchRoles()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteRole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return

    try {
      const res = await fetch(`/api/admin/roles/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete role")
      
      toast.success("Role deleted")
      fetchRoles()
    } catch (error) {
      toast.error("Error deleting role")
    }
  }

  const openCreateDialog = () => {
    setCurrentRole({ name: "", permissions: [], description: "" })
    setPermissionsInput("")
    setIsDialogOpen(true)
  }

  const openEditDialog = (role: Role) => {
    setCurrentRole(role)
    setPermissionsInput(role.permissions.join(", "))
    setIsDialogOpen(true)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure the LMS, manage users, roles, permissions, and integrations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {["general", "roles", "integrations", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">General Settings</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">System Name</label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => handleSettingChange("systemName", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">System Email</label>
            <input
              type="email"
              value={settings.systemEmail}
              onChange={(e) => handleSettingChange("systemEmail", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Time Zone</label>
            <select
              value={settings.timeZone}
              onChange={(e) => handleSettingChange("timeZone", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>UTC</option>
              <option>EST</option>
              <option>CST</option>
              <option>PST</option>
              <option>IST</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Chinese</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm font-medium text-foreground">Maintenance Mode</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => handleSettingChange("autoBackup", e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm font-medium text-foreground">Auto Backup Daily</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm font-medium text-foreground">Email Notifications</span>
            </label>
          </div>

          <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Save Settings
          </button>
        </div>
      )}

      {/* Roles & Permissions */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Roles & Permissions</h2>
          </div>

          {loadingRoles ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : errorRoles ? (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg border border-red-200">
              <p className="font-bold">Error loading roles</p>
              <p className="text-sm mt-2">{errorRoles}</p>
              <Button onClick={fetchRoles} variant="outline" className="mt-4">Try Again</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.length === 0 ? (
                <div className="col-span-full text-center p-8 text-muted-foreground">
                  No roles found. Please check your database connection or seed the roles.
                </div>
              ) : (
                roles
                  // Filter removed as requested to show all roles
                  // .filter(role => ["student", "teacher", "parent"].includes((role.name || "").toLowerCase()))
                  .map((role) => (
                  <div key={role.id} className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground capitalize">{role.name}</h3>
                        {role.description && <p className="text-sm text-muted-foreground mt-1">{role.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(role)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 flex-grow">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Permissions</h4>
                      {role.permissions && role.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {permission}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No permissions assigned</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Integrations */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-foreground">Integrations</h2>
          {loadingIntegrations ? (
             <div className="flex justify-center p-8">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={integration.id || index}
                className="bg-card border border-border rounded-lg p-6 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {integration.key === 'email_service' ? '📧' : 
                     integration.key === 'payment_gateway' ? '💳' :
                     integration.key === 'video_streaming' ? '🎥' : 
                     integration.key === 'file_storage' ? '💾' : '🔌'}
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">{integration.name}</h3>
                    <div className="flex items-center gap-2">
                        <p
                        className={`text-xs ${integration.status === "Connected" ? "text-green-600" : "text-yellow-600"}`}
                        >
                        {integration.status}
                        </p>
                        <span className={`w-2 h-2 rounded-full ${integration.isActive ? "bg-green-500" : "bg-gray-300"}`} title={integration.isActive ? "Active" : "Inactive"}></span>
                    </div>
                  </div>
                </div>
                <button 
                    onClick={() => openIntegrationDialog(integration)}
                    className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors text-sm font-medium">
                  Configure
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Security Settings</h2>

          <div>
            <h3 className="font-medium text-foreground mb-3">Password Policy</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Minimum Password Length</label>
                <input
                  type="number"
                  defaultValue="8"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Session Timeout (minutes)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="font-medium text-foreground mb-3">Security Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm font-medium text-foreground">Two-Factor Authentication Required</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                <span className="text-sm font-medium text-foreground">IP Whitelist Enabled</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm font-medium text-foreground">Force HTTPS</span>
              </label>
            </div>
          </div>

          <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Save Security Settings
          </button>
        </div>
      )}

      {/* Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentRole.id ? "Edit Role" : "Create Role"}</DialogTitle>
            <DialogDescription>
              Configure the role name and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input 
                id="role-name" 
                value={currentRole.name || ""} 
                onChange={(e) => setCurrentRole({...currentRole, name: e.target.value})}
                placeholder="e.g. Coordinator"
                disabled={true}
                className="bg-muted text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">Role name cannot be changed.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-desc">Description</Label>
              <Input 
                id="role-desc" 
                value={currentRole.description || ""} 
                onChange={(e) => setCurrentRole({...currentRole, description: e.target.value})}
                placeholder="Brief description of the role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-permissions">Permissions</Label>
              <Textarea 
                id="role-permissions" 
                value={permissionsInput} 
                onChange={(e) => setPermissionsInput(e.target.value)}
                placeholder="View Courses, Edit Grades (comma separated)"
                className="h-24"
              />
              <p className="text-xs text-muted-foreground">Separate permissions with commas.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRole} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Integration Dialog */}
      <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Configure Integration</DialogTitle>
            <DialogDescription>
              Update settings for {currentIntegration.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="intg-name">Name</Label>
              <Input 
                id="intg-name" 
                value={currentIntegration.name || ""} 
                onChange={(e) => setCurrentIntegration({...currentIntegration, name: e.target.value})}
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="intg-provider">Provider</Label>
                <Input
                    id="intg-provider"
                    value={currentIntegration.provider || ""}
                    onChange={(e) => setCurrentIntegration({...currentIntegration, provider: e.target.value})}
                    placeholder="e.g. SMTP, Stripe"
                />
            </div>
            {currentIntegration.key === 'payment_gateway' ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Active Provider</Label>
                        <div className="flex space-x-2 bg-muted p-1 rounded-md">
                            <button 
                                className={`px-3 py-1 text-xs font-medium rounded ${paymentConfig.activeProvider === 'stripe' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                onClick={() => setPaymentConfig({...paymentConfig, activeProvider: 'stripe'})}
                            >
                                Stripe
                            </button>
                            <button 
                                className={`px-3 py-1 text-xs font-medium rounded ${paymentConfig.activeProvider === 'paypal' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                onClick={() => setPaymentConfig({...paymentConfig, activeProvider: 'paypal'})}
                            >
                                PayPal
                            </button>
                        </div>
                    </div>

                    {paymentConfig.activeProvider === 'stripe' && (
                        <div className="space-y-4 border rounded-md p-4 bg-muted/20 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">Stripe Configuration</h4>
                                <select 
                                    className="border rounded p-1 text-xs bg-background"
                                    value={paymentConfig.stripe.mode}
                                    onChange={(e) => setPaymentConfig({
                                        ...paymentConfig, 
                                        stripe: { ...paymentConfig.stripe, mode: e.target.value }
                                    })}
                                >
                                    <option value="test">Test Mode</option>
                                    <option value="live">Live Mode</option>
                                </select>
                            </div>
                            
                            <div className="space-y-3">
                                <h5 className="text-xs font-bold uppercase text-muted-foreground mt-2">Test Credentials</h5>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Publishable Key</Label>
                                        <Input 
                                            value={paymentConfig.stripe.test.publishableKey}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, test: { ...paymentConfig.stripe.test, publishableKey: e.target.value } }
                                            })}
                                            placeholder="pk_test_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Secret Key</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.stripe.test.secretKey}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, test: { ...paymentConfig.stripe.test, secretKey: e.target.value } }
                                            })}
                                            placeholder="sk_test_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <Label className="text-xs">Webhook Secret</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.stripe.test.webhookSecret}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, test: { ...paymentConfig.stripe.test, webhookSecret: e.target.value } }
                                            })}
                                            placeholder="whsec_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 border-t pt-3">
                                <h5 className="text-xs font-bold uppercase text-muted-foreground">Live Credentials</h5>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Publishable Key</Label>
                                        <Input 
                                            value={paymentConfig.stripe.live.publishableKey}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, live: { ...paymentConfig.stripe.live, publishableKey: e.target.value } }
                                            })}
                                            placeholder="pk_live_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Secret Key</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.stripe.live.secretKey}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, live: { ...paymentConfig.stripe.live, secretKey: e.target.value } }
                                            })}
                                            placeholder="sk_live_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <Label className="text-xs">Webhook Secret</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.stripe.live.webhookSecret}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                stripe: { ...paymentConfig.stripe, live: { ...paymentConfig.stripe.live, webhookSecret: e.target.value } }
                                            })}
                                            placeholder="whsec_..."
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentConfig.activeProvider === 'paypal' && (
                        <div className="space-y-4 border rounded-md p-4 bg-muted/20 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">PayPal Configuration</h4>
                                <select 
                                    className="border rounded p-1 text-xs bg-background"
                                    value={paymentConfig.paypal.mode}
                                    onChange={(e) => setPaymentConfig({
                                        ...paymentConfig, 
                                        paypal: { ...paymentConfig.paypal, mode: e.target.value }
                                    })}
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="live">Live</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <h5 className="text-xs font-bold uppercase text-muted-foreground mt-2">Sandbox Credentials</h5>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Client ID</Label>
                                        <Input 
                                            value={paymentConfig.paypal.sandbox.clientId}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                paypal: { ...paymentConfig.paypal, sandbox: { ...paymentConfig.paypal.sandbox, clientId: e.target.value } }
                                            })}
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Client Secret</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.paypal.sandbox.clientSecret}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                paypal: { ...paymentConfig.paypal, sandbox: { ...paymentConfig.paypal.sandbox, clientSecret: e.target.value } }
                                            })}
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 border-t pt-3">
                                <h5 className="text-xs font-bold uppercase text-muted-foreground">Live Credentials</h5>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Client ID</Label>
                                        <Input 
                                            value={paymentConfig.paypal.live.clientId}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                paypal: { ...paymentConfig.paypal, live: { ...paymentConfig.paypal.live, clientId: e.target.value } }
                                            })}
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Client Secret</Label>
                                        <Input 
                                            type="password"
                                            value={paymentConfig.paypal.live.clientSecret}
                                            onChange={(e) => setPaymentConfig({
                                                ...paymentConfig,
                                                paypal: { ...paymentConfig.paypal, live: { ...paymentConfig.paypal.live, clientSecret: e.target.value } }
                                            })}
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : currentIntegration.key === 'email_service' ? (
                <div className="space-y-4 border rounded-md p-4 bg-muted/20">
                    <h4 className="font-medium text-sm">SMTP Configuration</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="smtp-host">Host</Label>
                            <Input 
                                id="smtp-host"
                                value={smtpConfig.host}
                                onChange={(e) => setSmtpConfig({...smtpConfig, host: e.target.value})}
                                placeholder="smtp.example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="smtp-port">Port</Label>
                            <Input 
                                id="smtp-port"
                                value={smtpConfig.port}
                                onChange={(e) => setSmtpConfig({...smtpConfig, port: e.target.value})}
                                placeholder="587"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="smtp-user">User</Label>
                            <Input 
                                id="smtp-user"
                                value={smtpConfig.user}
                                onChange={(e) => setSmtpConfig({...smtpConfig, user: e.target.value})}
                                placeholder="user@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="smtp-pass">Password</Label>
                            <Input 
                                id="smtp-pass"
                                type="password"
                                value={smtpConfig.password}
                                onChange={(e) => setSmtpConfig({...smtpConfig, password: e.target.value})}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="smtp-from-email">From Email</Label>
                            <Input 
                                id="smtp-from-email"
                                value={smtpConfig.fromEmail}
                                onChange={(e) => setSmtpConfig({...smtpConfig, fromEmail: e.target.value})}
                                placeholder="noreply@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="smtp-from-name">From Name</Label>
                            <Input 
                                id="smtp-from-name"
                                value={smtpConfig.fromName}
                                onChange={(e) => setSmtpConfig({...smtpConfig, fromName: e.target.value})}
                                placeholder="System Notification"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="smtp-secure"
                            checked={smtpConfig.secure}
                            onChange={(e) => setSmtpConfig({...smtpConfig, secure: e.target.checked})}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="smtp-secure">Secure (SSL/TLS)</Label>
                    </div>
                </div>
            ) : (
            <div className="space-y-2">
              <Label htmlFor="intg-config">Configuration (JSON)</Label>
              <Textarea 
                id="intg-config" 
                value={configInput} 
                onChange={(e) => setConfigInput(e.target.value)}
                placeholder='{"apiKey": "..."}'
                className="h-32 font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">Enter valid JSON configuration.</p>
            </div>
            )}
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        id="intg-active"
                        checked={currentIntegration.isActive || false}
                        onChange={(e) => setCurrentIntegration({...currentIntegration, isActive: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="intg-active">Active</Label>
                </div>
                <div className="space-y-2 flex-1">
                    <Label htmlFor="intg-status" className="sr-only">Status</Label>
                    <select
                        id="intg-status"
                        value={currentIntegration.status || "Disconnected"}
                        onChange={(e) => setCurrentIntegration({...currentIntegration, status: e.target.value})}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                        <option value="Connected">Connected</option>
                        <option value="Pending">Pending</option>
                        <option value="Disconnected">Disconnected</option>
                        <option value="Error">Error</option>
                    </select>
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveIntegration} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
