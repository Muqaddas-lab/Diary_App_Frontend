"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jwtDecode } from "jwt-decode";

export default function CreateEntryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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
        setError("Invalid token. Cannot find user ID.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/diaries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, mood, date, userId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Server responded with status: ${response.status}`
        );
      }

      setSuccess("Diary entry created successfully!");

      // clear form after success
      setTitle("");
      setContent("");
      setMood("");
      setDate("");

      // redirect after 2s delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating diary entry:", err);
      setError(
        err.message ||
          "Failed to create entry. Please check your network and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-purple-700">
        Create New Diary Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow-md"
      >
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
          <Select value={mood} onValueChange={setMood} required>
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

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Create Entry"}
        </Button>
      </form>
    </div>
  );
}
