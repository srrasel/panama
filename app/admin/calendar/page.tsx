"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CalendarDays, Clock, MapPin, Pencil, Plus, Trash2 } from "lucide-react"

const CATEGORIES = ["Academics", "Athletics", "Arts", "Community"] as const
const PUBLIC_TYPES = ["Event", "Exam", "Deadline"] as const

type CalendarEvent = {
  id: string
  title: string
  description: string | null
  type: string
  category: string | null
  location: string | null
  startTime: string
  endTime: string
}

const defaultForm = () => ({
  title: "",
  type: "Event",
  category: "Academics",
  date: new Date().toISOString().split("T")[0],
  startTime: "09:00",
  endTime: "10:00",
  location: "",
  description: "",
})

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/schedule")
      if (!res.ok) throw new Error("Failed to load")
      const data = await res.json()
      const publicEvents = (data.schedules || []).filter((ev: CalendarEvent) =>
        PUBLIC_TYPES.includes(ev.type as (typeof PUBLIC_TYPES)[number])
      )
      setEvents(publicEvents)
    } catch {
      toast.error("Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm(defaultForm())
    setEditingId(null)
  }

  const openForCreate = () => {
    resetForm()
    setIsOpen(true)
  }

  const openForEdit = (ev: CalendarEvent) => {
    setEditingId(ev.id)
    const start = new Date(ev.startTime)
    const end = new Date(ev.endTime)
    setForm({
      title: ev.title || "",
      type: ev.type || "Event",
      category: ev.category || "Academics",
      date: start.toISOString().split("T")[0],
      startTime: start.toTimeString().slice(0, 5),
      endTime: end.toTimeString().slice(0, 5),
      location: ev.location || "",
      description: ev.description || "",
    })
    setIsOpen(true)
  }

  const handleCreateOrUpdate = async () => {
    if (!form.title || !form.date || !form.startTime || !form.endTime) {
      toast.error("Please fill required fields")
      return
    }

    const start = new Date(`${form.date}T${form.startTime}`)
    const end = new Date(`${form.date}T${form.endTime}`)

    if (end <= start) {
      toast.error("End time must be after start time")
      return
    }

    setSaving(true)
    try {
      const payload = {
        title: form.title,
        description: form.description,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        type: form.type,
        category: form.category,
        location: form.location,
        courseId: null,
        teacherId: null,
      }

      const res = editingId
        ? await fetch(`/api/admin/schedule/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/schedule", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })

      if (!res.ok) throw new Error("Failed")
      toast.success(editingId ? "Event updated" : "Event created")
      setIsOpen(false)
      resetForm()
      fetchData()
    } catch {
      toast.error("Save failed")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? It will be removed from the public calendar.")) return
    try {
      const res = await fetch(`/api/admin/schedule/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Event deleted")
      setEvents(events.filter((e) => e.id !== id))
    } catch {
      toast.error("Delete failed")
    }
  }

  const formatTimeRange = (start: string, end: string) => {
    const s = new Date(start)
    const e = new Date(end)
    const opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" }
    return `${s.toLocaleTimeString("en-US", opts)} – ${e.toLocaleTimeString("en-US", opts)}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendar Management</h1>
          <p className="text-sm text-muted-foreground">
            Create and update events shown on the public{" "}
            <a href="/life/calendar" target="_blank" className="text-amber-500 hover:underline">
              /life/calendar
            </a>{" "}
            page
          </p>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-amber-500 text-black hover:bg-amber-600" onClick={openForCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Event" : "Add Event"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Fall Academic Symposium"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Start *</Label>
                  <Input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End *</Label>
                  <Input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Exam">Exam</SelectItem>
                      <SelectItem value="Deadline">Deadline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Main Auditorium"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the event"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2 justify-end pt-2">
                <Button variant="ghost" onClick={() => { setIsOpen(false); resetForm() }}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOrUpdate} disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">No public calendar events yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Click &quot;Add Event&quot; to create one.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary text-primary-foreground flex flex-col items-center justify-center text-center">
                    <span className="text-lg font-bold leading-none">
                      {new Date(ev.startTime).getDate()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {new Date(ev.startTime).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{ev.title}</div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimeRange(ev.startTime, ev.endTime)}
                      </span>
                      {ev.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-muted rounded">
                        {ev.type}
                      </span>
                      {ev.category && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-600 rounded">
                          {ev.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => openForEdit(ev)}>
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(ev.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
