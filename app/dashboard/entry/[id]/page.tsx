// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
// import { BookOpen, Edit, Trash2, ArrowLeft, Calendar } from "lucide-react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import axios from "axios"

// export default function EntryPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const [entry, setEntry] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [deleteError, setDeleteError] = useState("")

//   useEffect(() => {
//     const fetchEntry = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/diaries/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         setEntry(response.data)
//       } catch (err: any) {
//         setError(err?.response?.data?.message || "Failed to fetch entry.")
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchEntry()
//   }, [id])

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const res = await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_BASE}/diaries/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       if (res.status === 200) {
//         router.push("/dashboard")
//       } else {
//         setDeleteError(res.data?.message || "Failed to delete entry.")
//       }
//     } catch (err: any) {
//       console.error("Failed to delete entry:", err)
//       setDeleteError(err?.response?.data?.message || "Error deleting entry")
//     }
//   }

//   const getMoodColor = (mood: string) => {
//     switch (mood?.toLowerCase()) {
//       case "happy":
//         return "bg-yellow-100 text-yellow-800"
//       case "thoughtful":
//         return "bg-blue-100 text-blue-800"
//       case "excited":
//         return "bg-green-100 text-green-800"
//       case "peaceful":
//         return "bg-purple-100 text-purple-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   if (loading) return <div className="p-6 text-center">Loading...</div>
//   if (error) return <div className="p-6 text-center text-red-600">{error}</div>
//   if (!entry) return <div className="p-6 text-center text-red-600">Entry not found or unauthorized.</div>

//   return (
//     <SidebarInset>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <div className="flex items-center gap-2">
//           <BookOpen className="h-6 w-6 text-purple-600" />
//           <h1 className="text-xl font-semibold">Diary Entry</h1>
//         </div>
//       </header>

//       <div className="flex-1 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-6">
//             <Button variant="ghost" asChild>
//               <Link href="/dashboard">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Dashboard
//               </Link>
//             </Button>
//           </div>

//           <Card>
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="space-y-2">
//                   <CardTitle className="text-2xl">{entry.title}</CardTitle>
//                   <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4" />
//                       {formatDate(entry.date)}
//                     </div>
//                     <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button variant="outline" asChild>
//                     <Link href={`/dashboard/entry/${entry._id}/edit`}>
//                       <Edit className="mr-2 h-4 w-4" />
//                       Edit
//                     </Link>
//                   </Button>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently delete your diary entry.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
//                           Delete Entry
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                       {deleteError && <p className="text-red-600 mt-2 text-sm">{deleteError}</p>}
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <div className="prose prose-gray max-w-none">
//                 {(entry.content || "").split("\n\n").map((paragraph: string, index: number) => (
//                   <p key={index} className="mb-4 leading-relaxed">
//                     {paragraph}
//                   </p>
//                 ))}
//               </div>

//               <div className="mt-8 pt-4 border-t text-xs text-muted-foreground">
//                 <p>Created: {new Date(entry.createdAt).toLocaleString()}</p>
//                 {entry.updatedAt !== entry.createdAt && (
//                   <p>Last updated: {new Date(entry.updatedAt).toLocaleString()}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </SidebarInset>
//   )
// }





"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { BookOpen, Edit, Trash2, ArrowLeft, Calendar } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"

export default function EntryPage() {
  const { id } = useParams()
  const router = useRouter()
  const [entry, setEntry] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteError, setDeleteError] = useState("")

  useEffect(() => {
  const fetchEntry = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch entry.")
      }

      const data = await response.json()
      setEntry(data)
    } catch (err: any) {
      setError(err?.message || "Failed to fetch entry.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchEntry()
}, [id])

  // const handleDelete = async () => {
  //   try {
  //     const token = localStorage.getItem("token")
  //     const res = await axios.delete(
  //       `${process.env.NEXT_PUBLIC_API_BASE}/diaries/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )

  //     if (res.status === 200) {
  //       router.push("/dashboard")
  //     } else {
  //       setDeleteError(res.data?.message || "Failed to delete entry.")
  //     }
  //   } catch (err: any) {
  //     console.error("Failed to delete entry:", err)
  //     setDeleteError(err?.response?.data?.message || "Error deleting entry")
  //   }
  // }
const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/diaries/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete entry")
      }
      router.push("/dashboard")
    } catch (err: any) {
      setDeleteError(err.message || "Error deleting entry")
    }
  }



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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>
  if (!entry) return <div className="p-6 text-center text-red-600">Entry not found or unauthorized.</div>

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">Diary Entry</h1>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{entry.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(entry.date)}
                    </div>
                    <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/entry/${entry._id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your diary entry.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                          Delete Entry
                        </AlertDialogAction>
                      </AlertDialogFooter>
                      {deleteError && <p className="text-red-600 mt-2 text-sm">{deleteError}</p>}
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="prose prose-gray max-w-none">
                {(entry.content || "").split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t text-xs text-muted-foreground">
                <p>Created: {new Date(entry.createdAt).toLocaleString()}</p>
                {entry.updatedAt !== entry.createdAt && (
                  <p>Last updated: {new Date(entry.updatedAt).toLocaleString()}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
