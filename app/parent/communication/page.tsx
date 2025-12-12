"use client"

import { useEffect, useState } from "react"

export default function ParentCommunication() {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/parent/communication")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]))
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    fetch("/api/parent/communication", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage, subject: "Parent Message" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message) setMessages((prev) => [data.message, ...prev])
        setNewMessage("")
      })
      .catch(() => setNewMessage("")
      )
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Communication Center</h1>
            <p className="text-white/80">Messages from teachers and school administration</p>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white rounded-xl border ${message.unread ? "border-primary" : "border-slate-200"} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{message.from}</h3>
                <p className="text-sm text-muted-foreground">{message.role}</p>
              </div>
              {message.unread && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">New</span>
              )}
            </div>
            <p className="font-semibold text-foreground mb-2">{message.subject}</p>
            <p className="text-muted-foreground mb-3">{message.content}</p>
            <p className="text-xs text-muted-foreground">{message.date}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Send Message to School</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Recipient</label>
            <select className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Select a teacher or administrator</option>
              <option>Mr. James Smith - Mathematics</option>
              <option>Mrs. Sarah Johnson - English</option>
              <option>Dr. Michael Brown - Principal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
            <input
              type="text"
              placeholder="Message subject"
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              rows={5}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
