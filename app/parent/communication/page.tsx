"use client"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { Send, User, MoreVertical, Phone, Video, Search, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import ParentPortalLayout from "@/components/parent/parent-portal-layout"

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

export default function ParentCommunication() {
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/parent/communication")
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
      const res = await fetch(`/api/parent/communication?contactId=${contactId}`)
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
      const res = await fetch("/api/parent/communication", {
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

  return (
    <ParentPortalLayout
      title="Messages"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/parent/dashboard" },
        { label: "Messages" },
      ]}
    >
      <div className="bg-white rounded-[1.8rem] shadow-sm border border-slate-100 overflow-hidden h-[calc(100vh-250px)] min-h-[600px] flex">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">Loading conversations...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Sidebar - Contacts */}
            <div className={cn(
              "w-full md:w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col transition-all duration-300",
              mobileShowChat ? "hidden md:flex" : "flex"
            )}>
              <div className="p-6 border-b border-slate-100 bg-white">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Conversations</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input 
                    placeholder="Search teachers..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm transition-all"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {/* Active Chats Section */}
                {contacts.some(c => c.lastMessage) && (
                   <div className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
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
                        "px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors flex gap-4 items-start border-b border-slate-50",
                        selectedContact?.id === contact.id && "bg-white border-l-4 border-l-slate-900 shadow-sm"
                      )}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                          {contact.imageUrl ? (
                            <img src={contact.imageUrl} alt={contact.name} className="w-full h-full object-cover" />
                          ) : (
                            contact.name.charAt(0)
                          )}
                        </div>
                        {contact.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className={cn("font-bold text-sm truncate", selectedContact?.id === contact.id ? "text-slate-900" : "text-slate-700")}>
                            {contact.name}
                          </h3>
                          {contact.lastMessage && (
                            <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                              {formatTime(contact.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        <p className={cn("text-xs truncate", selectedContact?.id === contact.id ? "text-slate-500" : "text-slate-400")}>
                          {contact.lastMessage 
                            ? (contact.lastMessage.isMe ? "You: " : "") + contact.lastMessage.content 
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}

                {/* All Contacts Section */}
                <div className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                  All Contacts
                </div>

                {contacts
                  .filter(c => !c.lastMessage && (
                    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.role.toLowerCase().includes(searchTerm.toLowerCase())
                  ))
                  .length === 0 && !contacts.some(c => c.lastMessage) ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    {contacts.length === 0 
                      ? "No teachers found." 
                      : "No matching teachers found."}
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
                        "px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors flex gap-4 items-center border-b border-slate-50",
                        selectedContact?.id === contact.id && "bg-white border-l-4 border-l-slate-900 shadow-sm"
                      )}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                          {contact.imageUrl ? (
                            <img src={contact.imageUrl} alt={contact.name} className="w-full h-full object-cover" />
                          ) : (
                            contact.name.charAt(0)
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn("font-bold text-sm truncate", selectedContact?.id === contact.id ? "text-slate-900" : "text-slate-700")}>
                          {contact.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate italic mt-0.5">
                          Click to start conversation
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={cn(
              "flex-1 flex flex-col bg-slate-50/30 transition-all duration-300",
              !mobileShowChat ? "hidden md:flex" : "flex"
            )}>
              {selectedContact ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setMobileShowChat(false)}
                        className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                        {selectedContact.imageUrl ? (
                          <img src={selectedContact.imageUrl} alt={selectedContact.name} className="w-full h-full object-cover" />
                        ) : (
                          selectedContact.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{selectedContact.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{selectedContact.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-300">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <User className="w-10 h-10" />
                        </div>
                        <p className="font-medium">Start a conversation with {selectedContact.name}</p>
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
                            {!msg.isMe && (
                              <div className="w-8 h-8 flex-shrink-0">
                                {showAvatar && (
                                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden">
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
                              "rounded-2xl px-5 py-3 text-sm shadow-sm",
                              msg.isMe 
                                ? "bg-slate-900 text-white rounded-br-none" 
                                : "bg-white border border-slate-100 text-slate-700 rounded-bl-none"
                            )}>
                              <p className="leading-relaxed">{msg.content}</p>
                              <p className={cn(
                                "text-[10px] mt-1.5 text-right font-medium opacity-70",
                                msg.isMe ? "text-white/70" : "text-slate-400"
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
                  <div className="p-4 border-t border-slate-100 bg-white">
                    <form 
                      onSubmit={handleSendMessage}
                      className="flex gap-3 items-center"
                    >
                      <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 py-3.5 px-6 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className="p-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                    <User className="w-12 h-12 opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Conversation</h3>
                  <p className="max-w-md text-slate-500">
                    Choose a teacher from the sidebar to start chatting or check for new messages.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </ParentPortalLayout>
  )
}
