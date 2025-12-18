import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const sid = (await cookies()).get("session")?.value
  const session = await getSession(sid)
  const url = new URL(req.url)
  const contactId = url.searchParams.get("contactId")

  if (!session || session.role !== "parent") {
    console.log("Unauthorized access attempt to parent communication")
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

  if (!session || session.role !== "parent") {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { receiverId, subject, content } = body

    console.log(`Parent ${session.userId} sending message to ${receiverId}`)

    if (!receiverId || !content) {
      return Response.json({ error: "Recipient and content are required" }, { status: 400 })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId: session.userId,
        receiverId,
        subject: subject || "No Subject",
        content,
        isRead: false
      },
      include: {
        sender: true
      }
    })

    const formatted = {
      id: newMessage.id,
      from: "You",
      role: "Parent",
      subject: newMessage.subject,
      content: newMessage.content,
      date: newMessage.createdAt.toISOString().split("T")[0],
      unread: false,
      isMe: true
    }

    return Response.json({ message: formatted })
  } catch (error) {
    console.error("Send message error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
