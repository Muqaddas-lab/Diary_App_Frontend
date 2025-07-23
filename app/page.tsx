import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lock, Users, Edit3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Diary</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Your Personal Digital Diary</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Capture your thoughts, memories, and experiences in a secure, private space. Write, reflect, and grow with
            your personal diary companion.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Writing Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your entries are encrypted and completely private. Only you can access your thoughts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Edit3 className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Easy Writing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple, distraction-free writing interface. Focus on your thoughts, not the tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Multi-User</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Each user gets their own private space. Perfect for families or shared devices.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Organize & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find your past entries easily. Organize by date and search through your memories.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-8">
            Join thousands of users who trust My Diary with their most precious memories.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Create Your Account</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 My Diary. Your thoughts, your space, your privacy.</p>
        </div>
      </footer>
    </div>
  )
}
