"use client"

import { useState } from "react"

export default function StudentPage() {

  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const submitComplaint = async () => {

    const res = await fetch("http://127.0.0.1:8000/complaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: 1,
        category: category,
        description: description
      })
    })

    const data = await res.json()
    alert(data.message)
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Submit Complaint
      </h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Category"
        onChange={(e)=>setCategory(e.target.value)}
      />

      <textarea
        className="border p-2 mb-4 w-full"
        placeholder="Complaint Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-6 py-2 rounded"
        onClick={submitComplaint}
      >
        Submit Complaint
      </button>

    </div>
  )
}