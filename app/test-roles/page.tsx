"use client"
import { useState, useEffect } from "react"

export default function TestRoles() {
  const [roles, setRoles] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/roles")
      .then(res => res.json())
      .then(setRoles)
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="p-8">
      <h1>Test Roles API</h1>
      {error && <p className="text-red-500">{error}</p>}
      <pre>{JSON.stringify(roles, null, 2)}</pre>
    </div>
  )
}
