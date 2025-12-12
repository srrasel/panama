"use client"

import { useState } from "react"

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

  const [roles, setRoles] = useState([
    { id: 1, name: "Student", permissions: ["View Courses", "Submit Assignments", "View Grades"] },
    { id: 2, name: "Teacher", permissions: ["Create Courses", "Grade Assignments", "Manage Attendance"] },
    { id: 3, name: "Parent", permissions: ["View Child Performance", "Access Reports"] },
    { id: 4, name: "Admin", permissions: ["Full Access"] },
  ])

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
      <div className="flex gap-2 border-b border-border">
        {["general", "roles", "integrations", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
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
          <h2 className="text-lg font-bold text-foreground">Roles & Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{role.name}</h3>
                <div className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="text-green-600">✓</span>
                      {permission}
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium w-full">
                  Edit Permissions
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-foreground">Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Email Service", status: "Connected", icon: "📧" },
              { name: "Payment Gateway", status: "Connected", icon: "💳" },
              { name: "Video Streaming", status: "Pending", icon: "🎥" },
              { name: "File Storage", status: "Connected", icon: "💾" },
            ].map((integration, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-medium text-foreground">{integration.name}</h3>
                    <p
                      className={`text-xs ${integration.status === "Connected" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {integration.status}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors text-sm font-medium">
                  Configure
                </button>
              </div>
            ))}
          </div>
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
    </div>
  )
}
