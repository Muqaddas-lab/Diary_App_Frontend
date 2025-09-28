"use client"
import axios from "axios"
import React, { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { BookOpen, Save, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Console } from "console"

export default function EditEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ Correct way to unwrap `params`
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: "",
    date: "",
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Response status:", res); // Debugging line
        if (!res.ok) throw new Error("Failed to fetch entry")
        const data = await res.json()

        setFormData({
          title: data.title || "",
          content: data.content || "",
          mood: data.mood || "",
          date: data.date ? data.date.split("T")[0] : "",
        })
      } catch (err) {
        console.error(err)
        setError("Unable to load entry.")
      } finally {
        setLoading(false)
      }
    }

    fetchEntry()
  }, [id])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")
  //   setSuccess("")
  //   try {
  //     const token = localStorage.getItem("token")
  //     if (!token) throw new Error("No token found")

  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     })

  //     if (!res.ok) {
  //       const errorData = await res.json()
  //       throw new Error(errorData.message || "Failed to update entry")
  //     }

  //     setSuccess("Entry updated successfully.")
  //     router.push(`/dashboard/entry/${id}`)
  //   } catch (err: any) {
  //     console.error("Submit Error:", err)
  //     setError(err.message || "Error updating entry.")
  //   }
  // }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setSuccess("")
  try {
    const token = localStorage.getItem("token")
    console.log("Submitting token:", token) // 🐛 Check if null
    if (!token) throw new Error("No token found")

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    console.log("Update response:", data) // ✅ See backend error

    if (!res.ok) {
      throw new Error(data.message || "Failed to update entry")
    }

    setSuccess("Entry updated successfully.")
    router.push(`/dashboard/entry/${id}`)
  } catch (err: any) {
    console.error("Submit Error:", err)
    setError(err.message || "Error updating entry.")
  }
}




  if (loading) return <p className="p-6 text-lg">Loading entry...</p>

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">Edit Entry</h1>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href={`/dashboard/entry/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Entry
              </Link>
            </Button>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <Card>
            <CardHeader>
              <CardTitle>Edit Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select
                    value={formData.mood}
                    onValueChange={(value) => handleChange("mood", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How are you feeling?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">😊 Happy</SelectItem>
                      <SelectItem value="excited">🎉 Excited</SelectItem>
                      <SelectItem value="peaceful">😌 Peaceful</SelectItem>
                      <SelectItem value="thoughtful">🤔 Thoughtful</SelectItem>
                      <SelectItem value="grateful">🙏 Grateful</SelectItem>
                      <SelectItem value="sad">😢 Sad</SelectItem>
                      <SelectItem value="anxious">😰 Anxious</SelectItem>
                      <SelectItem value="angry">😠 Angry</SelectItem>
                      <SelectItem value="confused">😕 Confused</SelectItem>
                      <SelectItem value="neutral">😐 Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Your thoughts...</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    className="min-h-[300px] resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
