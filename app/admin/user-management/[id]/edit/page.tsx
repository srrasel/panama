"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Upload, Save, Users, Search, Image as ImageIcon } from "lucide-react"

export default function AdminEditUserPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = String(params?.id || "")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [bio, setBio] = useState("")
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  const [studentResults, setStudentResults] = useState<{ id: string; name: string; email: string }[]>([])
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`).catch(() => null)
      const u = await res?.json().catch(() => null)
      if (u?.id) {
        const [fn, ...rest] = String(u.name || "").split(" ")
        setFirstName(fn || "")
        setLastName(rest.join(" "))
        setEmail(u.email || "")
        setRole(u.role || "student")
        setBio(u.bio || "")
        setSelectedStudents(Array.isArray(u.children) ? u.children : [])
      }
    })()
  }, [id])

  useEffect(() => {
    let active = true
    const run = async () => {
      if (!search.trim()) { setStudentResults([]); return }
      setSearching(true)
      const res = await fetch(`/api/admin/users?role=student&q=${encodeURIComponent(search)}`).catch(() => null)
      const data = await res?.json().catch(() => null)
      if (!active) return
      setStudentResults(Array.isArray(data?.users) ? data.users : [])
      setSearching(false)
    }
    run()
    return () => { active = false }
  }, [search])

  const onSelectStudent = (s: { id: string; name: string }) => {
    if (selectedStudents.find((x) => x.id === s.id)) {
      setSelectedStudents(selectedStudents.filter((x) => x.id !== s.id))
    } else {
      setSelectedStudents([...selectedStudents, s])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!firstName || !lastName || !email) {
      setError("Please fill all required fields")
      return
    }
    setSubmitting(true)
    const fd = new FormData()
    fd.append("id", id)
    fd.append("firstName", firstName)
    fd.append("lastName", lastName)
    fd.append("email", email)
    fd.append("role", role)
    fd.append("bio", bio)
    if (password) fd.append("password", password)
    if (profileImage) fd.append("profileImage", profileImage)
    if (role === "parent") {
      for (const s of selectedStudents) fd.append("childrenIds", s.id)
    }
    const res = await fetch("/api/admin/users", { method: "PUT", body: fd }).catch(() => null)
    const data = await res?.json().catch(() => null)
    setSubmitting(false)
    if (!res || !res.ok) {
      setError(data?.error || "Failed to update user")
      return
    }
    router.push("/admin/user-management")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit User</h1>
          <p className="text-muted-foreground">Update account details, profile, and parent links</p>
        </div>
        <Link href="/admin/user-management" className="px-4 py-2 rounded-lg border">Back</Link>
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
              <label className="block text-sm font-medium text-foreground mb-2">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-input" />
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

          {role === "parent" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Assign Students</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students by name or email" className="flex-1 bg-transparent outline-none text-sm" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {searching && <div className="text-sm text-muted-foreground">Searching…</div>}
                {!searching && studentResults.map((s) => (
                  <button type="button" key={s.id} onClick={() => onSelectStudent({ id: s.id, name: s.name })} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${selectedStudents.find((x) => x.id === s.id) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>
                    <span className="text-sm">{s.name}</span>
                    <Users className="h-4 w-4" />
                  </button>
                ))}
              </div>
              {selectedStudents.length > 0 && (
                <div className="mt-3 text-sm text-muted-foreground">Selected: {selectedStudents.map((s) => s.name).join(", ")}</div>
              )}
            </div>
          )}

          {error && <div className="text-sm text-destructive">{error}</div>}

          <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />
            {submitting ? "Saving…" : "Save Changes"}
          </button>
        </form>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Notes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>Change role to update access</li>
            <li>Parents can link multiple students</li>
            <li>Use New Password only when resetting</li>
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

