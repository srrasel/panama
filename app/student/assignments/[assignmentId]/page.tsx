"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AssignmentDetails() {
  const params = useParams()
  const assignmentId = params.assignmentId as string

  const assignments = {
    "1": {
      id: 1,
      title: "Math Problem Set #5",
      course: "Advanced Calculus",
      dueDate: "2025-12-10",
      status: "Pending",
      description: "Complete problems 1-20 from chapter 5",
      instructions:
        "Work through all the problems in this assignment. Show your work for each step. Submit your answers as a PDF file.",
      points: 100,
      rubric: [
        { criteria: "Problem Accuracy", points: 60 },
        { criteria: "Work Shown", points: 25 },
        { criteria: "Presentation", points: 15 },
      ],
      files: ["Chapter5-Problems.pdf"],
    },
    "2": {
      id: 2,
      title: "Essay on World History",
      course: "Modern History",
      dueDate: "2025-12-12",
      status: "In Progress",
      description: "3000 words on the impact of technology",
      instructions:
        "Write a comprehensive essay analyzing the impact of technology on modern society. Include at least 5 scholarly sources. Use APA format.",
      points: 100,
      rubric: [
        { criteria: "Research & Sources", points: 25 },
        { criteria: "Argument Quality", points: 35 },
        { criteria: "Writing & Grammar", points: 25 },
        { criteria: "Format & Citations", points: 15 },
      ],
      files: ["Essay-Guidelines.docx"],
    },
    "3": {
      id: 3,
      title: "Programming Project",
      course: "Web Development",
      dueDate: "2025-12-15",
      status: "Pending",
      description: "Build a full-stack todo application",
      instructions:
        "Create a full-stack todo application using React and Node.js. Include features for creating, editing, deleting, and marking tasks complete.",
      points: 150,
      rubric: [
        { criteria: "Functionality", points: 60 },
        { criteria: "Code Quality", points: 40 },
        { criteria: "UI/UX", points: 30 },
        { criteria: "Documentation", points: 20 },
      ],
      files: ["Project-Requirements.md", "Starter-Code.zip"],
    },
    "4": {
      id: 4,
      title: "Book Report",
      course: "Literature & Composition",
      dueDate: "2025-12-08",
      status: "Submitted",
      description: 'Analysis of "1984" by George Orwell',
      instructions: "Write a detailed analysis of the book including themes, characters, and your personal critique.",
      points: 75,
      rubric: [
        { criteria: "Analysis Depth", points: 30 },
        { criteria: "Character Understanding", points: 25 },
        { criteria: "Writing Quality", points: 20 },
      ],
      files: ["1984-by-George-Orwell.pdf"],
      submittedDate: "2025-12-07",
      submittedFiles: ["Book-Report.docx"],
      grade: 92,
      feedback: "Excellent analysis! Your insights into the dystopian themes were particularly insightful.",
    },
  }

  const assignment = assignments[assignmentId as keyof typeof assignments]
  const [formData, setFormData] = useState({
    submissionText: "",
    files: null as FileList | null,
  })
  const [submitted, setSubmitted] = useState(false)

  if (!assignment) {
    return (
      <div className="space-y-6">
        <Link href="/student/assignments" className="text-primary hover:underline">
          ← Back to Assignments
        </Link>
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-foreground text-lg">Assignment not found</p>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.submissionText.trim() || formData.files?.length) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ submissionText: "", files: null })
      }, 3000)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, files: e.target.files })
  }

  const daysUntilDue = Math.ceil(
    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

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
                : assignment.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
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
              {daysUntilDue > 0 ? `${daysUntilDue} days left` : "Overdue"}
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
            <p className="text-foreground leading-relaxed">{assignment.instructions}</p>
          </div>

          {/* Rubric */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Grading Rubric</h2>
            <div className="space-y-3">
              {assignment.rubric.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <span className="text-foreground">{item.criteria}</span>
                  <span className="font-semibold text-primary">{item.points} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Files */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Required Files</h2>
            <div className="space-y-2">
              {assignment.files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                >
                  <span className="text-lg">📎</span>
                  <span className="text-foreground">{file}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Submission */}
          {assignment.status === "Submitted" && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h2 className="text-xl font-bold text-green-900 mb-4">Submitted Submission</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-green-700 mb-1">Submitted on</p>
                  <p className="font-semibold text-green-900">{assignment.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700 mb-2">Submitted Files</p>
                  {assignment.submittedFiles?.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">📎</span>
                      <span className="text-green-900">{file}</span>
                    </div>
                  ))}
                </div>
                {assignment.grade && (
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-sm text-green-700 mb-1">Grade</p>
                    <p className="text-2xl font-bold text-green-900">{assignment.grade}/100</p>
                  </div>
                )}
                {assignment.feedback && (
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-sm text-green-700 mb-2">Instructor Feedback</p>
                    <p className="text-green-900">{assignment.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <div className="col-span-1">
          {assignment.status !== "Submitted" ? (
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
                <p className="text-sm text-muted-foreground">This assignment has been submitted and graded.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
