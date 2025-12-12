"use client"

import { useState } from "react"

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Prof. James Smith",
    email: "james.smith@demo.com",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    qualification: "Ph.D. in Mathematics",
    experience: "15 years",
    bio: "Dedicated educator with passion for teaching mathematics and mentoring students.",
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Teacher Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl">
            JS
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="text-3xl font-bold px-3 py-1 rounded border border-border bg-input text-foreground mb-2 w-full"
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
              />
            ) : (
              <p className="text-lg text-muted-foreground">{profile.department}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            ) : (
              <p className="text-foreground">{profile.email}</p>
            )}
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
              <p className="text-foreground">{profile.phone}</p>
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
              <p className="text-foreground">{profile.qualification}</p>
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
              <p className="text-foreground">{profile.experience}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              rows={4}
            />
          ) : (
            <p className="text-foreground">{profile.bio}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground font-medium">Total Classes</p>
          <p className="text-3xl font-bold text-foreground mt-2">3</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground font-medium">Total Students</p>
          <p className="text-3xl font-bold text-foreground mt-2">95</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground font-medium">Assignments Created</p>
          <p className="text-3xl font-bold text-foreground mt-2">24</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground font-medium">Member Since</p>
          <p className="text-lg font-bold text-foreground mt-2">2020</p>
        </div>
      </div>
    </div>
  )
}
