"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Preloader from "@/components/preloader"

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const [resUsers, resRoles] = await Promise.all([
          fetch("/api/admin/users").catch(() => null),
          fetch("/api/admin/roles").catch(() => null)
        ])
        
        const dataUsers = await resUsers?.json().catch(() => null)
        setUsers(Array.isArray(dataUsers?.users) ? dataUsers.users : [])
        
        const dataRoles = await resRoles?.json().catch(() => null)
        if (Array.isArray(dataRoles)) {
          // Filter roles for tabs
          const allowedRoles = ["student", "teacher", "parent"]
          setRoles(dataRoles.filter((r: any) => allowedRoles.includes(r.name)))
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filterUsers = users.filter((user) => {
    if (activeTab === "all") return true
    return user.role === activeTab
  })
  const handleDeleteUser = async (id: string) => {
    await fetch("/api/admin/users", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) }).catch(() => null)
    setUsers(users.filter((user) => user.id !== id))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800"
      case "teacher":
        return "bg-purple-100 text-purple-800"
      case "parent":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-blue-100 text-blue-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) return <Preloader />

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Create, manage, and delete student, teacher, and parent accounts</p>
        </div>
        <Link
          href="/admin/user-management/create"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Add New User
        </Link>
      </div>

      {/* Add User Form moved to /admin/user-management/create */}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveTab(r.name)}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === r.name
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Created</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">—</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link href={`/admin/user-management/${user.id}/edit`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
