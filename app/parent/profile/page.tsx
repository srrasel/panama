"use client"

import { useState, useEffect } from "react"
import { useParent } from "../ParentContext"
import { User, Phone, Mail, MapPin, Save, Edit2, GraduationCap, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ProfileImageUpload } from "@/components/profile-image-upload"

export default function ParentProfile() {
  const { childrenList, isLoading: childrenLoading, setSelectedChild, refreshChildren } = useParent()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  
  // Link student state
  const [isLinking, setIsLinking] = useState(false)
  const [linkEmail, setLinkEmail] = useState("")
  const [isSubmittingLink, setIsSubmittingLink] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
  })

  useEffect(() => {
    fetch("/api/parent/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data)
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          bio: data.bio || "",
        })
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch("/api/parent/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        const updated = await res.json()
        setProfile(updated)
        setIsEditing(false)
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (e) {
      toast.error("An error occurred")
    }
  }

  const handleLinkStudent = async () => {
    const emailToLink = linkEmail.trim()
    if (!emailToLink) {
      toast.error("Please enter a valid email address")
      return
    }
    
    setIsSubmittingLink(true)
    try {
      const res = await fetch("/api/parent/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToLink })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success("Student linked successfully")
        setLinkEmail("")
        setIsLinking(false)
        await refreshChildren()
      } else {
        toast.error(data.error || "Failed to link student")
      }
    } catch (e) {
      toast.error("An error occurred while linking student")
    } finally {
      setIsSubmittingLink(false)
    }
  }

  const handleStudentSelect = (child: any) => {
    setSelectedStudent(child)
    setSelectedChild(child) // Update global context
  }

  if (loading) return <div className="p-8">Loading profile...</div>

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and view your linked students.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        {/* Main Profile Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center gap-6">
                 <ProfileImageUpload 
                   currentImageUrl={profile?.imageUrl}
                   onImageUploaded={(url) => {
                     setProfile((prev: any) => ({ ...prev, imageUrl: url }))
                     // Auto save
                     fetch("/api/parent/profile", {
                       method: "PUT",
                       headers: { "Content-Type": "application/json" },
                       body: JSON.stringify({ imageUrl: url })
                     })
                   }}
                   size="md"
                 />
                 <div className="space-y-1">
                   <h2 className="text-2xl font-bold">{profile?.name}</h2>
                   <p className="text-muted-foreground flex items-center gap-2">
                     <Mail className="w-4 h-4" /> {profile?.email}
                   </p>
                 </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    disabled={!isEditing} 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    disabled={!isEditing} 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Bio / Notes</Label>
                  <Textarea 
                    disabled={!isEditing} 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})} 
                    placeholder="Tell us about yourself..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Students Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Students</CardTitle>
                <CardDescription>Select a student to view their detailed profile.</CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsLinking(!isLinking)}>
                {isLinking ? "Cancel" : "Add Student"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLinking && (
                <div className="bg-muted p-4 rounded-lg space-y-3 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-medium text-sm">Link New Student</h4>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter student email..." 
                      value={linkEmail}
                      onChange={(e) => setLinkEmail(e.target.value)}
                    />
                    <Button onClick={handleLinkStudent} disabled={isSubmittingLink}>
                      {isSubmittingLink ? "Linking..." : "Link"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the email address the student used to register.
                  </p>
                </div>
              )}

              {childrenLoading ? (
                <div className="text-center py-4">Loading students...</div>
              ) : childrenList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No students linked to your account.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {childrenList.map((child: any) => (
                    <div 
                      key={child.id}
                      onClick={() => handleStudentSelect(child)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all hover:shadow-md ${
                        selectedStudent?.id === child.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                          {child.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{child.name}</p>
                          <p className="text-xs text-muted-foreground">{child.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Student Details Panel */}
        <div className="space-y-6">
           {selectedStudent ? (
             <Card className="sticky top-6 border-l-4 border-l-primary shadow-lg animate-in fade-in slide-in-from-right-4">
               <CardHeader className="bg-muted/30 pb-4">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl text-primary">Student Details</CardTitle>
                      <CardDescription>Viewing profile for {selectedStudent.name}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>Close</Button>
                 </div>
               </CardHeader>
               <CardContent className="space-y-6 pt-6">
                  <div className="flex flex-col items-center text-center pb-6 border-b">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold mb-3 shadow-md">
                      {selectedStudent.name?.[0]?.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-muted-foreground">{selectedStudent.email}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Student ID</p>
                        <p className="text-sm font-medium">{selectedStudent.studentId || "Not assigned"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Major / Class</p>
                        <p className="text-sm font-medium">{selectedStudent.major || "General"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="text-sm font-medium">{selectedStudent.dateOfBirth || "Not set"}</p>
                      </div>
                    </div>

                     <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{selectedStudent.phone || "No phone number"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full" variant="outline" asChild>
                      <a href={`/parent/dashboard?childId=${selectedStudent.id}`}>View Dashboard</a>
                    </Button>
                  </div>
               </CardContent>
             </Card>
           ) : (
             <Card className="bg-muted/20 border-dashed">
               <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                   <User className="w-8 h-8 opacity-50" />
                 </div>
                 <p className="font-medium">No student selected</p>
                 <p className="text-sm mt-1">Click on a student from the list to view their details here.</p>
               </CardContent>
             </Card>
           )}
        </div>
      </div>
    </div>
  )
}
