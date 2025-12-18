import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  const url = new URL(req.url)
  const contactId = url.searchParams.get("contactId")

  if (!session || session.role !== "student") {
    console.log("Unauthorized access attempt to student communication")
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 1. If contactId is provided, fetch specific conversation
  if (contactId) {
    console.log(`Fetching messages between ${session.userId} and ${contactId}`)
    try {
      // Mark messages as read
      await prisma.message.updateMany({
      where: {
        senderId: contactId,
        receiverId: session.userId,
        isRead: false
      },
      data: { isRead: true }
    })

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.userId, receiverId: contactId },
          { senderId: contactId, receiverId: session.userId }
        ]
      },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { name: true, role: true, imageUrl: true } },
        receiver: { select: { name: true, role: true } }
      }
    })

    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      senderId: msg.senderId,
      senderName: msg.sender.name,
      senderImage: msg.sender.imageUrl,
      createdAt: msg.createdAt,
      isMe: msg.senderId === session.userId,
      isRead: msg.isRead
    }))

    return Response.json({ messages: formattedMessages })
    } catch (error) {
      console.error("Error fetching messages:", error)
      return Response.json({ error: "Failed to fetch messages" }, { status: 500 })
    }
  }

  // 2. Fetch Contacts (All Teachers & Admins)
  
  // Get all teachers
  const teachers = await prisma.user.findMany({
    where: { role: "teacher" },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      role: true
    }
  })
  
  const admins = await prisma.user.findMany({
    where: { role: "admin" },
    select: { id: true, name: true, email: true, imageUrl: true, role: true }
  })

  const allContacts = [...admins, ...teachers]

  // Fetch last message for each contact to show preview
  const contactsWithPreview = await Promise.all(allContacts.map(async (contact) => {
    try {
      const lastMessage = await prisma.message.findFirst({
        where: {
          OR: [
            { senderId: session.userId, receiverId: contact.id },
            { senderId: contact.id, receiverId: session.userId }
          ]
        },
        orderBy: { createdAt: "desc" }
      })

      const unreadCount = await prisma.message.count({
        where: {
          senderId: contact.id,
          receiverId: session.userId,
          isRead: false
        }
      })

      return {
        ...contact,
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          createdAt: lastMessage.createdAt,
          isMe: lastMessage.senderId === session.userId
        } : null,
        unreadCount
      }
    } catch (error) {
      console.error(`Error fetching message info for contact ${contact.id}:`, error)
      return {
        ...contact,
        lastMessage: null,
        unreadCount: 0
      }
    }
  }))

  // Sort by last message date
  contactsWithPreview.sort((a, b) => {
    const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0
    const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0
    return dateB - dateA
  })

  return Response.json({ contacts: contactsWithPreview })
}

export async function POST(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)

  if (!session || session.role !== "student") {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content, subject, receiverId } = await req.json()
    
    console.log(`Sending message from ${session.userId} to ${receiverId}`)

    if (!content || !receiverId) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        subject: subject || "No Subject",
        senderId: session.userId,
        receiverId
      },
      include: {
        sender: { select: { name: true, role: true } },
        receiver: { select: { name: true, role: true } }
      }
    })

    return Response.json({ message })
  } catch (e) {
    console.error("Message send error:", e)
    return Response.json({ error: "Failed to send message" }, { status: 500 })
  }
}
