"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Search, BookOpen, Edit, Trash2, LogOut } from "lucide-react"

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (!token) {
      router.replace("/login")
      return
    }

    const fetchEntries = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to load entries.")
        }

        const data = await response.json()
        setEntries(data.diaries || [])
      } catch (err: any) {
        setError(err.message || "Failed to load entries.")
        console.error("API ERROR:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [router])

  const filteredEntries = entries.filter(
    (entry: any) =>
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getMoodColor = (mood: string) => {
    switch (mood?.toLowerCase()) {
      case "happy":
        return "bg-yellow-100 text-yellow-800"
      case "thoughtful":
        return "bg-blue-100 text-blue-800"
      case "excited":
        return "bg-green-100 text-green-800"
      case "peaceful":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">My Diary Dashboard</h1>
        </div>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Ready to capture today's thoughts and memories?</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/new-entry">
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entries.length}</div>
              <p className="text-xs text-muted-foreground">Your diary collection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entries.length}</div>
              <p className="text-xs text-muted-foreground">Entries this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Entries */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Entries</h3>

          {loading ? (
            <p>Loading entries...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEntries.map((entry: any) => (
                <Card key={entry._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                        <CardDescription>{entry.date}</CardDescription>
                      </div>
                      <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {entry.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/entry/${entry._id}`}>
                          <BookOpen className="mr-1 h-3 w-3" />
                          Read
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/entry/${entry._id}/edit`}>
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  )
}
