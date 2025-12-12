import { NextResponse } from "next/server"
import { z } from "zod"
import { createUser, users, searchUsers, setParentChildren, getUserByEmail, getUserById, getChildrenForParent, updateUser, deleteUser } from "@/lib/db"
import type { Role } from "@/lib/auth"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  const role = url.searchParams.get("role") as Role | null
  const q = url.searchParams.get("q") || undefined
  if (id) {
    const u = getUserById(id)
    if (!u) return NextResponse.json({ error: "Not Found" }, { status: 404 })
    const children = u.role === "parent" ? getChildrenForParent(u.id).map((c) => ({ id: c.id, name: c.name })) : []
    return NextResponse.json({ id: u.id, name: u.name, email: u.email, role: u.role, imageUrl: u.imageUrl, bio: u.bio || "", childrenIds: children.map((c) => c.id), children })
  }
  const list = searchUsers({ role: role || undefined, q })
  return NextResponse.json({ users: list.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, imageUrl: u.imageUrl })) })
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || ""
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    const firstName = String(fd.get("firstName") || "").trim()
    const lastName = String(fd.get("lastName") || "").trim()
    const email = String(fd.get("email") || "").trim().toLowerCase()
    const password = String(fd.get("password") || "")
    const confirm = String(fd.get("confirmPassword") || "")
    const role = String(fd.get("role") || "student") as Role
    const image = fd.get("profileImage") as File | null
    const bio = String(fd.get("bio") || "")
    const childrenIds = fd.getAll("childrenIds").map((v) => String(v))

    if (!firstName || !lastName || !email || !password || password.length < 6 || password !== confirm) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }
    if (getUserByEmail(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }
    const user = createUser({ name: `${firstName} ${lastName}`.trim(), email, role, password })
    if (image) user.imageUrl = `/uploads/${image.name}`
    if (bio) user.bio = bio
    if (role === "parent" && childrenIds.length) setParentChildren(user.id, childrenIds)
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role, imageUrl: user.imageUrl })
  } else {
    const schema = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["student","teacher","admin","parent"]).default("student"),
      bio: z.string().optional(),
      childrenIds: z.array(z.string()).optional(),
    })
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    if (getUserByEmail(parsed.data.email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }
    const user = createUser({ name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(), email: parsed.data.email, role: parsed.data.role, password: parsed.data.password })
    if (parsed.data.bio) user.bio = parsed.data.bio
    if (parsed.data.role === "parent" && parsed.data.childrenIds?.length) setParentChildren(user.id, parsed.data.childrenIds)
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  }
}

export async function PUT(req: Request) {
  const contentType = req.headers.get("content-type") || ""
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    const id = String(fd.get("id") || "")
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
    const firstName = String(fd.get("firstName") || "").trim()
    const lastName = String(fd.get("lastName") || "").trim()
    const email = String(fd.get("email") || "").trim().toLowerCase()
    const password = String(fd.get("password") || "")
    const role = String(fd.get("role") || "") as Role
    const image = fd.get("profileImage") as File | null
    const bio = String(fd.get("bio") || "")
    const childrenIds = fd.getAll("childrenIds").map((v) => String(v))
    const name = [firstName, lastName].filter(Boolean).join(" ").trim()
    const payload: any = {}
    if (name) payload.name = name
    if (email) payload.email = email
    if (role) payload.role = role
    if (image) payload.imageUrl = `/uploads/${image.name}`
    if (bio) payload.bio = bio
    if (password) payload.password = password
    const u = updateUser(id, payload)
    if (u.role === "parent") setParentChildren(id, childrenIds)
    return NextResponse.json({ id: u.id, name: u.name, email: u.email, role: u.role, imageUrl: u.imageUrl })
  } else {
    const schema = z.object({
      id: z.string().min(1),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      role: z.enum(["student","teacher","admin","parent"]).optional(),
      bio: z.string().optional(),
      childrenIds: z.array(z.string()).optional(),
    })
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    const name = [parsed.data.firstName || "", parsed.data.lastName || ""].filter(Boolean).join(" ").trim()
    const u = updateUser(parsed.data.id, {
      name: name || undefined,
      email: parsed.data.email,
      role: parsed.data.role,
      password: parsed.data.password,
      bio: parsed.data.bio,
    })
    if (parsed.data.role === "parent" && parsed.data.childrenIds) setParentChildren(u.id, parsed.data.childrenIds)
    return NextResponse.json({ id: u.id, name: u.name, email: u.email, role: u.role })
  }
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => ({}))
  const id = String(body.id || "")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
  try {
    deleteUser(id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Not Found" }, { status: 404 })
  }
}
