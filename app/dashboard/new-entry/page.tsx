// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { jwtDecode } from "jwt-decode";
// export default function CreateEntryPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [mood, setMood] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("You must be logged in to create a diary entry.");
//         setLoading(false);
//         return;
//       }
//        // Decode token to get userId
//       const decoded: any = jwtDecode(token);
//       const userId = decoded?.id;

//       if (!userId) {
//         setError("Invalid token. Cannot find user.");
//         setLoading(false);
//         return;
//       }
//       await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/diaries`,
//         { title, content, mood, date},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Failed to create entry. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center text-purple-700">Create New Diary Entry</h1>

//       <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             placeholder="Give your entry a title..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <Label>Date</Label>
//           <Input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <Label>Mood</Label>
//           <Select value={mood} onValueChange={setMood}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select your mood..." />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="happy">😊 Happy</SelectItem>
//               <SelectItem value="sad">😢 Sad</SelectItem>
//               <SelectItem value="angry">😠 Angry</SelectItem>
//               <SelectItem value="excited">🎉 Excited</SelectItem>
//               <SelectItem value="peaceful">😌 Peaceful</SelectItem>
//               <SelectItem value="thoughtful">🤔 Thoughtful</SelectItem>
//               <SelectItem value="anxious">😰 Anxious</SelectItem>
//               <SelectItem value="grateful">🙏 Grateful</SelectItem>
//               <SelectItem value="confused">😕 Confused</SelectItem>
//               <SelectItem value="neutral">😐 Neutral</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label>Content</Label>
//           <Textarea
//             placeholder="Write your thoughts..."
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={8}
//             className="resize-none"
//             required
//           />
//         </div>

//         {error && <p className="text-red-600">{error}</p>}

//         <Button type="submit" disabled={loading} className="w-full">
//           {loading ? "Saving..." : "Create Entry"}
//         </Button>
//       </form>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jwtDecode } from "jwt-decode";
export default function CreateEntryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a diary entry.");
      setLoading(false);
      return;
    }

    const decoded: any = jwtDecode(token);
    const userId = decoded?.id;

    if (!userId) {
      setError("Invalid token. Cannot find user.");
      setLoading(false);
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, mood, date }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create entry.");
    }

    router.push("/dashboard");
  } catch (err: any) {
    setError(err.message || "Failed to create entry. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-purple-700">Create New Diary Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Give your entry a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Mood</Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your mood..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="happy">😊 Happy</SelectItem>
              <SelectItem value="sad">😢 Sad</SelectItem>
              <SelectItem value="angry">😠 Angry</SelectItem>
              <SelectItem value="excited">🎉 Excited</SelectItem>
              <SelectItem value="peaceful">😌 Peaceful</SelectItem>
              <SelectItem value="thoughtful">🤔 Thoughtful</SelectItem>
              <SelectItem value="anxious">😰 Anxious</SelectItem>
              <SelectItem value="grateful">🙏 Grateful</SelectItem>
              <SelectItem value="confused">😕 Confused</SelectItem>
              <SelectItem value="neutral">😐 Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Content</Label>
          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="resize-none"
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Create Entry"}
        </Button>
      </form>
    </div>
  );
}


