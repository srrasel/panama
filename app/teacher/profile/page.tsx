"use client"

import { useState, useEffect } from "react"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { toast } from "sonner"

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    imageUrl: "",
    // Retaining these as they might not be in user model yet but were in UI
    department: "Mathematics", 
    qualification: "Ph.D. in Mathematics",
    experience: "15 years",
  })

  useEffect(() => {
    fetch("/api/teacher/profile")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error("Failed to load profile")
          return
        }
        setProfile(prev => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          imageUrl: data.imageUrl || "",
        }))
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch("/api/teacher/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      })

      if (res.ok) {
        setIsEditing(false)
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Error saving profile")
    }
  }

  if (loading) return <div className="p-8">Loading profile...</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Teacher Profile</h1>
        <button
          onClick={() => {
            if (isEditing) handleSave()
            else setIsEditing(true)
          }}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-start gap-6 mb-8">
          <ProfileImageUpload 
            currentImageUrl={profile.imageUrl}
            onImageUploaded={(url) => {
              setProfile(prev => ({ ...prev, imageUrl: url }))
              // Auto save
              fetch("/api/teacher/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: url })
              })
            }}
          />
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="text-3xl font-bold px-3 py-1 rounded border border-border bg-input text-foreground mb-2 w-full"
                placeholder="Name"
              />
            ) : (
              <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
            )}
            {isEditing ? (
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="text-lg px-3 py-1 rounded border border-border bg-input text-foreground"
                placeholder="Department"
              />
            ) : (
              <p className="text-lg text-muted-foreground">{profile.department}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <p className="text-foreground p-2 bg-muted/30 rounded">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            ) : (
              <p className="text-foreground p-2">{profile.phone || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Qualification</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.qualification}
                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            ) : (
              <p className="text-foreground p-2">{profile.qualification}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Experience</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            ) : (
              <p className="text-foreground p-2">{profile.experience}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground h-32"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-foreground p-2 whitespace-pre-wrap">{profile.bio || "No bio available."}</p>
          )}
        </div>
      </div>
    </div>
  )
}
