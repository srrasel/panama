"use client"

import { useState, useEffect } from "react"
import { useParent } from "../ParentContext"
import { User, Phone, Mail, MapPin, Save, Edit2, GraduationCap, Calendar, BookOpen, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"

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

  return (
    <ParentPortalLayout
      title="My Profile"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Profile" },
      ]}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Profile Column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
              <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isEditing 
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
              
              <div className="space-y-8">
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
                     <h2 className="text-2xl font-bold text-slate-900">{profile?.name}</h2>
                     <p className="text-slate-500 flex items-center gap-2">
                       <Mail className="w-4 h-4" /> {profile?.email}
                     </p>
                   </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Full Name</Label>
                    <Input 
                      disabled={!isEditing} 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="rounded-xl border-slate-200 focus:ring-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Phone Number</Label>
                    <Input 
                      disabled={!isEditing} 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      placeholder="+1 (555) 000-0000"
                      className="rounded-xl border-slate-200 focus:ring-slate-900"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-slate-600 font-medium">Bio / Notes</Label>
                    <Textarea 
                      disabled={!isEditing} 
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})} 
                      placeholder="Tell us about yourself..."
                      className="min-h-[120px] rounded-xl border-slate-200 focus:ring-slate-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Linked Students Section */}
            <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
              <div className="flex flex-row items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">My Students</h2>
                  <p className="text-slate-500 mt-1">Select a student to view their detailed profile.</p>
                </div>
                <button 
                  onClick={() => setIsLinking(!isLinking)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isLinking 
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                  }`}
                >
                  {isLinking ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isLinking ? "Cancel" : "Add Student"}
                </button>
              </div>
              
              <div className="space-y-6">
                {isLinking && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
                    <h4 className="font-bold text-slate-900 mb-4">Link New Student</h4>
                    <div className="flex gap-3">
                      <Input 
                        placeholder="Enter student email..." 
                        value={linkEmail}
                        onChange={(e) => setLinkEmail(e.target.value)}
                        className="rounded-xl border-slate-200 focus:ring-slate-900"
                      />
                      <button 
                        onClick={handleLinkStudent} 
                        disabled={isSubmittingLink}
                        className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingLink ? "Linking..." : "Link"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      Enter the email address the student used to register.
                    </p>
                  </div>
                )}

                {childrenLoading ? (
                  <div className="text-center py-8 text-slate-500">Loading students...</div>
                ) : childrenList.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                    No students linked to your account.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {childrenList.map((child: any) => (
                      <div 
                        key={child.id}
                        onClick={() => handleStudentSelect(child)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                          selectedStudent?.id === child.id 
                            ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" 
                            : "border-slate-100 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg">
                            {child.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{child.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{child.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Student Details Panel */}
          <div className="space-y-6">
             {selectedStudent ? (
               <div className="sticky top-6 bg-white rounded-[1.8rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-right-4">
                 <div className="bg-slate-50 p-6 border-b border-slate-100">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900">Student Details</h3>
                        <p className="text-sm text-slate-500">Viewing profile for {selectedStudent.name}</p>
                      </div>
                      <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                   </div>
                 </div>
                 <div className="p-6 space-y-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center text-4xl font-bold mb-4 shadow-xl shadow-slate-900/10">
                        {selectedStudent.name?.[0]?.toUpperCase()}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h3>
                      <p className="text-slate-500 font-medium">{selectedStudent.email}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm text-slate-600 flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Student ID</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.studentId || "Not assigned"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm text-slate-600 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Major / Class</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.major || "General"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm text-slate-600 flex items-center justify-center">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date of Birth</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.dateOfBirth || "Not set"}</p>
                        </div>
                      </div>

                       <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm text-slate-600 flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.phone || "No phone number"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <a 
                        href={`/parent/dashboard?childId=${selectedStudent.id}`}
                        className="block w-full text-center py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                      >
                        View Dashboard
                      </a>
                    </div>
                 </div>
               </div>
             ) : (
               <div className="bg-slate-50 rounded-[1.8rem] border border-slate-100 border-dashed p-8 flex flex-col items-center justify-center text-center h-[400px]">
                 <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-slate-300">
                   <User className="w-8 h-8" />
                 </div>
                 <p className="font-bold text-slate-900">No student selected</p>
                 <p className="text-sm text-slate-500 mt-1 max-w-[200px]">Click on a student from the list to view their details here.</p>
               </div>
             )}
          </div>
        </div>
      )}
    </ParentPortalLayout>
  )
}
