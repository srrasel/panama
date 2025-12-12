"use client"

import { useState } from "react"

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "student@demo.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "2005-03-15",
    studentID: "STU-2025-001",
    major: "Computer Science",
    notifications: {
      assignments: true,
      grades: true,
      announcements: true,
      messages: true,
    },
  })

  const handleChange = (field: string, value: string | boolean) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (key: string) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications],
      },
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted-foreground">{profile.studentID}</p>
              <p className="text-sm text-muted-foreground mt-1">{profile.major}</p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled={true}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Major</label>
            <input
              type="text"
              value={profile.major}
              onChange={(e) => handleChange("major", e.target.value)}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h2>
        <div className="space-y-4">
          {Object.entries(profile.notifications).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
                className="w-4 h-4"
              />
              <span className="text-foreground font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Account Actions</h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-left">
            Change Password
          </button>
          <button className="w-full px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-left">
            Download Academic Records
          </button>
          <button className="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors font-medium text-left">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
