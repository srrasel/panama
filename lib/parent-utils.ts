import { prisma } from "@/lib/prisma"
import { getChildForParent, getUserById } from "@/lib/db"

export async function getSelectedChild(session: any, searchParams: URLSearchParams) {
  if (!session) return null

  if (session.role === "student") {
    return await getUserById(session.userId)
  }

  if (session.role === "parent") {
    const childId = searchParams.get("childId")
    if (childId) {
      // Verify ownership
      const rel = await prisma.parentChild.findUnique({
        where: {
          parentId_childId: {
            parentId: session.userId,
            childId: childId
          }
        },
        include: { child: true }
      })
      if (rel) return { ...rel.child, role: rel.child.role as any } // mapUser-ish
    }
    // Default to first child
    return await getChildForParent(session.userId)
  }

  return null
}
