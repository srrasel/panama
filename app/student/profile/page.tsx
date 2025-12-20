"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Home, 
  UserCircle, 
  MessageSquare, 
  BookMarked, 
  Heart, 
  Star, 
  Save,
  Camera,
  Mail,
  Phone,
  Calendar,
  User,
  Shield,
  Bell,
  LogOut
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ProfileImageUpload } from "@/components/profile-image-upload"

export default function StudentProfile() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string; imageUrl?: string } | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    studentID: "",
    major: "",
    imageUrl: "",
    notifications: {
      assignments: true,
      grades: true,
      announcements: true,
      messages: true,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch User Context (for sidebar)
        const userRes = await fetch("/api/auth/me")
        const userData = await userRes.json()
        if (userData?.name) {
          setUser(userData)
        }

        // Fetch Full Profile Data
        const profileRes = await fetch("/api/student/profile")
        const profileData = await profileRes.json()
        
        if (profileData.profile) {
          setProfile(profileData.profile)
        } else if (userData) {
          // Fallback if no specific profile data yet
            const [first, ...last] = (userData.name || "").split(" ")
            setProfile(prev => ({
                ...prev,
                firstName: first || "",
                lastName: last.join(" ") || "",
                email: userData.email || "",
                imageUrl: userData.imageUrl || ""
            }))
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch("/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })
      
      if (res.ok) {
        setEditMode(false)
        // Update local user state for sidebar reflection if needed
        setUser(prev => prev ? ({ ...prev, name: `${profile.firstName} ${profile.lastName}`, imageUrl: profile.imageUrl }) : null)
      } else {
        console.error("Failed to save profile")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (key: string) => {
    if (!editMode) return
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications],
      },
    }))
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7f1d1d] mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Loading profile...</p>
            </div>
        </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Red Header Section */}
      <section className="bg-[#7f1d1d] py-28 px-6">
        <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-6xl font-extrabold tracking-tight">My Profile</h1>
            <nav className="flex items-center text-lg mt-3 font-semibold">
              <Link href="/" className="text-white hover:text-yellow-500 transition-colors">Home</Link>
              <span className="text-slate-600 mx-2">/</span>
              <Link href="/student/dashboard" className="text-white hover:text-yellow-500 transition-colors">Dashboard</Link>
              <span className="text-slate-600 mx-2">/</span>
              <span className="text-amber-600">My Profile</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1520px] mx-auto px-6 -mt-16 flex flex-col lg:flex-row gap-8 pb-12">
        
        {/* Sidebar Profile Card (Identical to Dashboard) */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-md overflow-hidden relative">
                    <Image 
                        src={profile.imageUrl || user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800">{user?.name || "Student Name"}</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">
                {user?.email || "student@example.com"}
              </p>
            </div>

            <hr className="w-4/5 mx-auto" />

            <nav className="p-4 space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 px-4 mb-2 tracking-widest">
                Welcome {user?.name?.split(' ')[0] || "Student"},
              </p>
              <Link href="/student/dashboard" className="flex items-center gap-3 text-slate-500 hover:bg-[#007bff] hover:text-white px-4 py-3 rounded-xl duration-300 transition-all font-medium">
                <Home className="w-5 h-5" /> Dashboard
              </Link>
              <Link href="/student/profile" className="flex items-center gap-3 px-4 py-3 bg-[#007bff] text-white rounded-xl duration-300 transition-all font-semibold shadow-lg shadow-blue-200">
                <UserCircle className="w-5 h-5" /> My Profile
              </Link>
              <Link href="/student/communication" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#007bff] rounded-xl duration-300 hover:text-white transition-all font-medium">
                <MessageSquare className="w-5 h-5" /> Message
              </Link>
              <Link href="/student/courses" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#007bff] rounded-xl duration-300 hover:text-white transition-all font-medium">
                <BookMarked className="w-5 h-5" /> Enrolled Courses
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#007bff] rounded-xl duration-300 hover:text-white transition-all font-medium">
                <Heart className="w-5 h-5" /> Wishlist
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#007bff] rounded-xl duration-300 hover:text-white transition-all font-medium">
                <Star className="w-5 h-5" /> Reviews
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl duration-300 hover:text-red-600 transition-all font-medium mt-4"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Profile Edit Content */}
        <div className="flex-1 space-y-6">
            
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Profile Settings</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage your personal information and preferences</p>
                </div>
                <button
                    onClick={() => {
                        if (editMode) handleSave()
                        else setEditMode(true)
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        editMode 
                        ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200" 
                        : "bg-[#007bff] text-white hover:bg-blue-600 shadow-lg shadow-blue-200"
                    }`}
                >
                    {editMode ? <Save className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />}
                    {editMode ? "Save Changes" : "Edit Profile"}
                </button>
            </div>

            {/* Main Form Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left Column: Image & Basic Info */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[1.8rem] shadow-sm border border-slate-100 flex flex-col items-center">
                        <div className="relative mb-6">
                            <ProfileImageUpload 
                                currentImageUrl={profile.imageUrl}
                                onImageUploaded={(url) => {
                                    setProfile(prev => ({ ...prev, imageUrl: url }))
                                    // Optionally save immediately
                                }}
                            />
                        </div>
                        <div className="text-center w-full">
                            <h3 className="text-xl font-bold text-slate-800 mb-1">{profile.firstName} {profile.lastName}</h3>
                            <p className="text-slate-500 text-sm mb-4">{profile.major || "Student"}</p>
                            <div className="bg-slate-50 rounded-xl p-4 w-full text-left space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="truncate">{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span>{profile.phone || "No phone added"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>Joined 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Form */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#007bff]" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">First Name</label>
                                <input
                                    type="text"
                                    value={profile.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Last Name</label>
                                <input
                                    type="text"
                                    value={profile.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled={true}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                                <input
                                    type="date"
                                    value={profile.dateOfBirth}
                                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Major / Specialization</label>
                                <input
                                    type="text"
                                    value={profile.major}
                                    onChange={(e) => handleChange("major", e.target.value)}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#007bff]/20 focus:border-[#007bff] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                    placeholder="e.g. Computer Science"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Notifications */}
                        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-[#007bff]" /> Notifications
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(profile.notifications).map(([key, value]) => (
                                    <label key={key} className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-slate-600 font-medium capitalize group-hover:text-slate-800 transition-colors">
                                            {key.replace(/([A-Z])/g, " $1").trim()}
                                        </span>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={value} 
                                                onChange={() => handleNotificationChange(key)}
                                                disabled={!editMode}
                                                className="sr-only peer" 
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Security */}
                        <div className="bg-white p-8 rounded-[1.8rem] shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#007bff]" /> Security
                            </h3>
                            <div className="space-y-4">
                                <button className="w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-bold text-left border border-slate-200 flex justify-between items-center group">
                                    Change Password
                                    <span className="text-slate-400 group-hover:text-slate-600 transition-colors">→</span>
                                </button>
                                <button className="w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-bold text-left border border-slate-200 flex justify-between items-center group">
                                    Two-Factor Auth
                                    <span className="text-slate-400 group-hover:text-slate-600 transition-colors">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  )
}
