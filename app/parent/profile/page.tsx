"use client"

import { useState } from "react"

export default function ParentProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const profileData = {
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Springfield, IL 62701",
    childName: "Emma Johnson",
    childGrade: "10th Grade",
    childSchool: "Central High School",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Parent Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              RJ
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
              <p className="text-muted-foreground">Parent Account</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Parent Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
            <p className="text-lg text-foreground font-medium">{profileData.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
            <p className="text-lg text-foreground font-medium">{profileData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
            <p className="text-lg text-foreground font-medium">{profileData.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
            <p className="text-lg text-foreground font-medium">{profileData.address}</p>
          </div>
        </div>

        {/* Child Information */}
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Child Information</h3>
          <div className="grid md:grid-cols-3 gap-6 bg-muted p-4 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Child's Name</p>
              <p className="text-lg text-foreground font-medium">{profileData.childName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Grade</p>
              <p className="text-lg text-foreground font-medium">{profileData.childGrade}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">School</p>
              <p className="text-lg text-foreground font-medium">{profileData.childSchool}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { label: "Grade Updates", checked: true },
            { label: "Attendance Alerts", checked: true },
            { label: "Assignment Reminders", checked: true },
            { label: "Event Announcements", checked: false },
            { label: "Email Notifications", checked: true },
          ].map((pref, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <label className="text-foreground font-medium">{pref.label}</label>
              <input type="checkbox" defaultChecked={pref.checked} className="w-5 h-5 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Security Settings</h3>
        <button className="px-6 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  )
}
