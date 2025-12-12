import { hashPassword } from "@/lib/auth"
import type { Role } from "@/lib/auth"

export type User = {
  id: string
  name: string
  email: string
  role: Role
  passwordHash: string
  passwordSalt: string
  createdAt: number
  imageUrl?: string
  bio?: string
  childrenIds?: string[]
}

const users: User[] = []

const parentChildMap = new Map<string, string[]>()

function getUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

function getUserById(id: string) {
  return users.find((u) => u.id === id)
}

function createUser(data: { name: string; email: string; role: Role; password: string }) {
  const exists = getUserByEmail(data.email)
  if (exists) throw new Error("User already exists")
  const { salt, hash } = hashPassword(data.password)
  const user: User = {
    id: Math.random().toString(36).slice(2),
    name: data.name,
    email: data.email,
    role: data.role,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: Date.now(),
  }
  users.push(user)
  return user
}

;(function seed() {
  const demo = [
    { name: "Student Demo", email: "student@demo.com", role: "student" as Role },
    { name: "Teacher Demo", email: "teacher@demo.com", role: "teacher" as Role },
    { name: "Admin Demo", email: "admin@demo.com", role: "admin" as Role },
    { name: "Parent Demo", email: "parent@demo.com", role: "parent" as Role },
  ]
  for (const d of demo) {
    if (!getUserByEmail(d.email)) {
      createUser({ name: d.name, email: d.email, role: d.role, password: "demo123" })
    }
  }
  const parent = getUserByEmail("parent@demo.com")
  const student = getUserByEmail("student@demo.com")
  if (parent && student) parentChildMap.set(parent.id, [student.id])
})()

function getChildForParent(parentId: string) {
  const sids = parentChildMap.get(parentId)
  const sid = Array.isArray(sids) ? sids[0] : undefined
  return sid ? getUserById(sid) : undefined
}

function getChildrenForParent(parentId: string) {
  const sids = parentChildMap.get(parentId) || []
  return sids.map((id) => getUserById(id)).filter(Boolean) as User[]
}

function setParentChildren(parentId: string, childIds: string[]) {
  parentChildMap.set(parentId, childIds)
}

function searchUsers(params: { role?: Role; q?: string }) {
  const q = (params.q || "").toLowerCase()
  return users.filter((u) => {
    if (params.role && u.role !== params.role) return false
    if (!q) return true
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })
}

function updateUser(id: string, data: Partial<{ name: string; email: string; role: Role; password: string; imageUrl?: string; bio?: string }>) {
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) throw new Error("Not Found")
  const u = users[idx]
  if (data.name !== undefined) u.name = data.name
  if (data.email !== undefined) u.email = data.email
  if (data.role !== undefined) u.role = data.role
  if (data.imageUrl !== undefined) u.imageUrl = data.imageUrl
  if (data.bio !== undefined) u.bio = data.bio
  if (data.password) {
    const { salt, hash } = hashPassword(data.password)
    u.passwordSalt = salt
    u.passwordHash = hash
  }
  users[idx] = u
  return u
}

function deleteUser(id: string) {
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) throw new Error("Not Found")
  users.splice(idx, 1)
  parentChildMap.delete(id)
  for (const [pid, arr] of parentChildMap.entries()) {
    parentChildMap.set(pid, (arr || []).filter((cid) => cid !== id))
  }
  return true
}

export { users, getUserByEmail, getUserById, createUser, getChildForParent, getChildrenForParent, setParentChildren, searchUsers, updateUser, deleteUser }
