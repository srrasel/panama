"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function AssignmentDetails() {
  const params = useParams()
  const assignmentId = params.assignmentId as string
  const [assignment, setAssignment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    submissionText: "",
    files: null as FileList | null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/student/assignments/${assignmentId}`)
      .then(res => res.json())
      .then(data => {
        if (data.assignment) setAssignment(data.assignment)
        else setError("Assignment not found")
      })
      .catch(() => setError("Failed to load assignment"))
      .finally(() => setLoading(false))
  }, [assignmentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.submissionText.trim() && !formData.files?.length) return

    const fd = new FormData()
    fd.append("submissionText", formData.submissionText)
    if (formData.files) {
      Array.from(formData.files).forEach((file) => {
        fd.append("files", file)
      })
    }

    try {
      const res = await fetch(`/api/student/assignments/${assignmentId}/submit`, {
        method: "POST",
        body: fd
      })
      
      if (res.ok) {
        setSubmitted(true)
        // Refresh
        const data = await fetch(`/api/student/assignments/${assignmentId}`).then(res => res.json())
        if (data.assignment) setAssignment(data.assignment)
        setFormData({ submissionText: "", files: null })
      } else {
        alert("Submission failed")
      }
    } catch (e) {
      alert("Error submitting")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, files: e.target.files })
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error || !assignment) {
    return (
      <div className="space-y-6">
        <Link href="/student/assignments" className="text-primary hover:underline">
          ← Back to Assignments
        </Link>
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-foreground text-lg">{error || "Assignment not found"}</p>
        </div>
      </div>
    )
  }

  const daysUntilDue = assignment.dueDate ? Math.ceil(
    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  ) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <Link href="/student/assignments" className="text-primary hover:underline inline-flex items-center gap-2">
        ← Back to Assignments
      </Link>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{assignment.title}</h1>
            <p className="text-muted-foreground">{assignment.course}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              assignment.status === "Submitted"
                ? "bg-green-100 text-green-700"
                : assignment.status === "Overdue"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
            }`}
          >
            {assignment.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Due Date</p>
            <p className="font-semibold text-foreground">{assignment.dueDate}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {daysUntilDue > 0 ? `${daysUntilDue} days left` : daysUntilDue === 0 ? "Due today" : "Overdue"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Points</p>
            <p className="font-semibold text-foreground">{assignment.points}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <p className="font-semibold text-foreground">{assignment.status}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Instructions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Instructions</h2>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{assignment.description || "No instructions provided."}</p>
          </div>

          {/* Previous Submission */}
          {assignment.submission && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h2 className="text-xl font-bold text-green-900 mb-4">Your Submission</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-green-700 mb-1">Submitted on</p>
                  <p className="font-semibold text-green-900">{new Date(assignment.submission.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700 mb-2">Content</p>
                  <pre className="text-green-900 whitespace-pre-wrap font-sans">{assignment.submission.content}</pre>
                </div>
                {assignment.submission.grade !== null && (
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-sm text-green-700 mb-1">Grade</p>
                    <p className="text-2xl font-bold text-green-900">{assignment.submission.grade}/{assignment.points}</p>
                  </div>
                )}
                {assignment.submission.feedback && (
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-sm text-green-700 mb-2">Instructor Feedback</p>
                    <p className="text-green-900">{assignment.submission.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <div className="col-span-1">
          {!assignment.submission ? (
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-lg border border-border p-6 sticky top-8 space-y-4"
            >
              <h2 className="text-xl font-bold text-foreground">Submit Work</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Submission Text</label>
                <textarea
                  value={formData.submissionText}
                  onChange={(e) => setFormData({ ...formData, submissionText: e.target.value })}
                  placeholder="Enter your submission text here..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload Files</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm file:mr-2 file:px-3 file:py-1 file:bg-primary file:text-primary-foreground file:rounded file:border-0 file:cursor-pointer"
                />
                {formData.files && (
                  <p className="text-xs text-muted-foreground mt-2">{formData.files.length} file(s) selected</p>
                )}
              </div>

              {submitted && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  ✓ Submission successful! Your work has been submitted.
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Submit Assignment
              </button>

              <p className="text-xs text-muted-foreground text-center">
                {daysUntilDue > 0 ? `Due in ${daysUntilDue} days` : daysUntilDue === 0 ? "Due today" : "Overdue"}
              </p>
            </form>
          ) : (
            <div className="bg-card rounded-lg border border-border p-6 sticky top-8">
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="text-lg font-bold text-green-700 mb-2">Already Submitted</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
