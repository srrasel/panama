"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Send, User, MoreVertical, Phone, Video, Search, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type Contact = {
  id: string
  name: string
  role: string
  imageUrl: string | null
  email: string
  lastMessage?: {
    content: string
    createdAt: string
    isMe: boolean
  } | null
  unreadCount: number
}

type Message = {
  id: string
  content: string
  senderId: string
  senderName: string
  senderImage: string | null
  createdAt: string
  isMe: boolean
  isRead: boolean
}

export default function TeacherCommunication() {
  const searchParams = useSearchParams()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [mobileShowChat, setMobileShowChat] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  // Fetch contacts on load
  useEffect(() => {
    fetchContacts()
    const interval = setInterval(fetchContacts, 5000)
    return () => clearInterval(interval)
  }, [])

  // Poll for messages when contact is selected
  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id)
      pollingInterval.current = setInterval(() => fetchMessages(selectedContact.id), 1000)
    } else {
      setMessages([])
    }
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current)
    }
  }, [selectedContact])

  // Handle deep linking from student management
  useEffect(() => {
    const studentId = searchParams.get("studentId")
    if (studentId && contacts.length > 0 && !selectedContact) {
      const student = contacts.find(c => c.id === studentId)
      if (student) {
        setSelectedContact(student)
        setMobileShowChat(true)
      }
    }
  }, [searchParams, contacts, selectedContact])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/teacher/communication")
      const data = await res.json()
      if (data.contacts) {
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error("Failed to fetch contacts", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async (contactId: string) => {
    try {
      const res = await fetch(`/api/teacher/communication?contactId=${contactId}`)
      const data = await res.json()
      if (data.messages) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Failed to fetch messages", error)
    }
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!newMessage.trim() || !selectedContact) return

    const messageContent = newMessage
    setNewMessage("")
    
    // Optimistic update
    const optimisticMessage: Message = {
      id: "optimistic-" + Date.now(),
      content: messageContent,
      senderId: "me", 
      senderName: "Me",
      senderImage: null,
      createdAt: new Date().toISOString(),
      isMe: true,
      isRead: false
    }
    setMessages(prev => [...prev, optimisticMessage])

    try {
      const res = await fetch("/api/teacher/communication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: messageContent,
          receiverId: selectedContact.id,
          subject: "Chat Message"
        }),
      })

      if (res.ok) {
        const data = await res.json()
        // Replace optimistic message with real one
        if (data.message) {
           const realMessage = {
             ...data.message,
             isMe: true,
             senderName: "Me",
             senderImage: null
           }
           setMessages(prev => prev.map(m => m.id.startsWith("optimistic") ? realMessage : m))
        }
        fetchContacts() // Update last message in sidebar
      } else {
        toast.error("Failed to send message")
        // Rollback optimistic update if needed, but simple reload fixes it
        fetchMessages(selectedContact.id)
      }
    } catch (error) {
      toast.error("Error sending message")
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (isLoading) return <div className="p-8 flex justify-center">Loading chat...</div>

  return (
    <div className="h-[calc(100vh-120px)] bg-card border border-border rounded-xl shadow-sm overflow-hidden flex">
      {/* Sidebar - Contacts */}
      <div className={cn(
        "w-full md:w-80 border-r border-border bg-muted/30 flex flex-col transition-all duration-300",
        mobileShowChat ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-border bg-card">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search students, parents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Active Chats Section */}
          {contacts.some(c => c.lastMessage) && (
             <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/20">
               Recent
             </div>
          )}

          {contacts
            .filter(c => c.lastMessage && (
               c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               c.role.toLowerCase().includes(searchTerm.toLowerCase())
            ))
            .map(contact => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact)
                  setMobileShowChat(true)
                }}
                className={cn(
                  "p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors flex gap-3 items-start",
                  selectedContact?.id === contact.id && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {contact.imageUrl ? (
                      <img src={contact.imageUrl} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      contact.name.charAt(0)
                    )}
                  </div>
                  {contact.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center border-2 border-white">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                    {contact.lastMessage && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTime(contact.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                       {contact.role}
                     </span>
                     <p className="text-xs text-muted-foreground truncate flex-1">
                      {contact.lastMessage 
                        ? (contact.lastMessage.isMe ? "You: " : "") + contact.lastMessage.content 
                        : ""}
                     </p>
                  </div>
                </div>
              </div>
            ))}

          {/* All Contacts Section */}
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/20 mt-2">
            All Contacts
          </div>

          {contacts
            .filter(c => !c.lastMessage && (
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.role.toLowerCase().includes(searchTerm.toLowerCase())
            ))
            .length === 0 && !contacts.some(c => c.lastMessage) ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              {contacts.length === 0 
                ? "No contacts available." 
                : "No matching contacts found."}
            </div>
          ) : (
            contacts
              .filter(c => !c.lastMessage && (
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.role.toLowerCase().includes(searchTerm.toLowerCase())
              ))
              .map(contact => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact)
                  setMobileShowChat(true)
                }}
                className={cn(
                  "p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors flex gap-3 items-start",
                  selectedContact?.id === contact.id && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {contact.imageUrl ? (
                      <img src={contact.imageUrl} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      contact.name.charAt(0)
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                       {contact.role}
                     </span>
                     <p className="text-xs text-muted-foreground truncate flex-1 italic">
                       Click to start conversation
                     </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-card transition-all duration-300",
        !mobileShowChat ? "hidden md:flex" : "flex"
      )}>
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileShowChat(false)}
                  className="md:hidden p-2 hover:bg-muted rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selectedContact.imageUrl ? (
                    <img src={selectedContact.imageUrl} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    selectedContact.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{selectedContact.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedContact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <button className="p-2 hover:bg-muted rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                  <User className="w-16 h-16 mb-4" />
                  <p>Start a conversation with {selectedContact.name}</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3 max-w-[80%]",
                        msg.isMe ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      {/* Avatar placeholder for spacing if needed, or actual avatar */}
                      {!msg.isMe && (
                        <div className="w-8 h-8 flex-shrink-0">
                          {showAvatar && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                              {msg.senderImage ? (
                                <img src={msg.senderImage} alt={msg.senderName} className="w-full h-full object-cover" />
                              ) : (
                                msg.senderName.charAt(0)
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className={cn(
                        "rounded-2xl px-4 py-2 text-sm shadow-sm",
                        msg.isMe 
                          ? "bg-primary text-primary-foreground rounded-br-none" 
                          : "bg-white border border-border rounded-bl-none"
                      )}>
                        <p>{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-1 text-right opacity-70",
                          msg.isMe ? "text-primary-foreground" : "text-muted-foreground"
                        )}>
                          {formatTime(msg.createdAt)}
                          {msg.isMe && (
                            <span className="ml-1">
                              {msg.isRead ? "✓✓" : "✓"}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <form 
                onSubmit={handleSendMessage}
                className="flex gap-2 items-center"
              >
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 py-3 px-4 rounded-full border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <User className="w-10 h-10 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Select a Conversation</h3>
            <p className="max-w-md">
              Choose a student or parent from the sidebar to start chatting or check for new messages.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
