import { prisma } from "@/lib/prisma"
import { hashPassword, Role } from "@/lib/auth"
import type { User as PrismaUser } from "@prisma/client"

export const db = prisma

export type User = {
  id: string
  name: string
  email: string
  role: string
  passwordHash: string
  passwordSalt: string
  createdAt: number
  imageUrl?: string
  bio?: string
  childrenIds?: string[]
}

function mapUser(u: PrismaUser): User {
  return {
    ...u,
    role: u.role,
    createdAt: u.createdAt.getTime(),
    imageUrl: u.imageUrl || undefined,
    bio: u.bio || undefined,
  }
}

export async function getUserByEmail(email: string) {
  const u = await prisma.user.findUnique({ where: { email } })
  return u ? mapUser(u) : undefined
}

export async function getUserById(id: string) {
  const u = await prisma.user.findUnique({ where: { id } })
  return u ? mapUser(u) : undefined
}

export async function createUser(data: { name: string; email: string; role: string; password: string }) {
  const { salt, hash } = hashPassword(data.password)
  const u = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      passwordHash: hash,
      passwordSalt: salt,
    }
  })
  return mapUser(u)
}

export async function getChildForParent(parentId: string) {
  const rel = await prisma.parentChild.findFirst({
    where: { parentId },
    include: { child: true }
  })
  return rel?.child ? mapUser(rel.child) : undefined
}

export async function getChildrenForParent(parentId: string) {
  const rels = await prisma.parentChild.findMany({
    where: { parentId },
    include: { child: true }
  })
  return rels.map(r => mapUser(r.child))
}

export async function setParentChildren(parentId: string, childIds: string[]) {
  // Use transaction to replace children
  await prisma.$transaction(async (tx) => {
    await tx.parentChild.deleteMany({ where: { parentId } })
    if (childIds.length > 0) {
      await tx.parentChild.createMany({
        data: childIds.map(childId => ({ parentId, childId }))
      })
    }
  })
}

export async function searchUsers(params: { role?: string; q?: string }) {
  const where: any = {}
  if (params.role) where.role = params.role
  if (params.q) {
    const q = params.q
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } }
    ]
  }
  const users = await prisma.user.findMany({ where })
  return users.map(mapUser)
}

export async function updateUser(id: string, data: Partial<{ name: string; email: string; role: string; password: string; imageUrl?: string; bio?: string }>) {
  const updateData: any = {}
  if (data.name) updateData.name = data.name
  if (data.email) updateData.email = data.email
  if (data.role) updateData.role = data.role
  if (data.imageUrl) updateData.imageUrl = data.imageUrl
  if (data.bio) updateData.bio = data.bio
  if (data.password) {
    const { salt, hash } = hashPassword(data.password)
    updateData.passwordHash = hash
    updateData.passwordSalt = salt
  }

  const u = await prisma.user.update({
    where: { id },
    data: updateData
  })
  return mapUser(u)
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
}
