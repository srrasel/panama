"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, UserPlus, Image as ImageIcon } from "lucide-react"
import Preloader from "@/components/preloader"

export default function TeacherAddStudentPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [bio, setBio] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [courses, setCourses] = useState<{ id: string; title: string }[]>([])
  const [loadingCourses, setLoadingCourses] = useState(false)
  const [courseId, setCourseId] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true)
      try {
        const res = await fetch("/api/teacher/course-management/courses").catch(() => null)
        if (res && res.ok) {
          const data = await res.json()
          setCourses(data.courses || [])
        }
      } finally {
        setLoadingCourses(false)
      }
    }
    fetchCourses()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!firstName || !lastName || !email || !password || password !== confirmPassword) {
      setError("Please fill all fields and ensure passwords match")
      return
    }
    setSubmitting(true)
    const fd = new FormData()
    fd.append("firstName", firstName)
    fd.append("lastName", lastName)
    fd.append("email", email)
    fd.append("password", password)
    fd.append("confirmPassword", confirmPassword)
    fd.append("bio", bio)
    if (profileImage) fd.append("profileImage", profileImage)
    if (courseId) fd.append("courseId", courseId)

    const res = await fetch("/api/teacher/student-management", { method: "POST", body: fd }).catch(() => null)
    const data = await res?.json().catch(() => null)
    setSubmitting(false)
    if (!res || !res.ok) {
      setError(data?.error || "Failed to create student")
      return
    }
    router.push("/teacher/student-management")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
          <p className="text-muted-foreground">Create a new student account and enroll them in a course</p>
        </div>
        <Link href="/teacher/student-management" className="px-4 py-2 rounded-lg border">Back</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Assign Course (Optional)</label>
              <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" disabled={loadingCourses}>
                <option value="">Select a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Profile Image</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
              </label>
              {profileImage && (
                <span className="text-sm text-muted-foreground inline-flex items-center gap-2"><ImageIcon className="h-4 w-4" /> {profileImage.name}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <RichTextEditor value={bio} onChange={setBio} minHeight={160} />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <UserPlus className="h-4 w-4" />
            {submitting ? "Creating…" : "Create Student"}
          </button>
        </form>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Use strong passwords with at least 6 characters</li>
            <li>Select a course to immediately enroll the student</li>
            <li>Upload a square profile image for best results</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function RichTextEditor({ value, onChange, minHeight }: { value: string; onChange: (html: string) => void; minHeight?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const initialized = useRef(false)
  const exec = (cmd: string, val?: string) => {
    if (ref.current) ref.current.focus()
    document.execCommand(cmd, false, val)
    if (ref.current) onChange(ref.current.innerHTML)
  }
  useEffect(() => {
    if (!initialized.current && ref.current) {
      ref.current.innerHTML = value || ""
      initialized.current = true
    }
  }, [value])
  return (
    <div className="border border-border rounded-lg">
      <div className="flex flex-wrap gap-2 p-2 border-b border-border">
        {[
          { label: "Bold", cmd: "bold" },
          { label: "Italic", cmd: "italic" },
          { label: "Underline", cmd: "underline" },
          { label: "H1", cmd: "formatBlock", val: "h1" },
          { label: "H2", cmd: "formatBlock", val: "h2" },
          { label: "Quote", cmd: "formatBlock", val: "blockquote" },
          { label: "UL", cmd: "insertUnorderedList" },
          { label: "OL", cmd: "insertOrderedList" },
        ].map((b) => (
          <button key={b.label} type="button" onClick={() => exec(b.cmd, (b as any).val)} className="px-3 py-1 rounded bg-muted text-sm">
            {b.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        className="p-3 min-h-[120px] outline-none whitespace-pre-wrap"
        style={{ minHeight: minHeight || 120 }}
      />
    </div>
  )
}
