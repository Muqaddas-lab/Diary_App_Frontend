"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, Mail, Lock } from "lucide-react"; // ✅ added icons

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        console.log("✅ Received Token:", data.token);
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        router.push("/dashboard");
      } else {
        localStorage.removeItem("token");
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold">My Diary</h1>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your personal diary</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{"Don't have an account? "}</span>
            <Link href="/signup" className="text-purple-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { BookOpen, Eye, EyeOff } from "lucide-react";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       router.push("/dashboard");
//     }
//   }, [router]);

//   // ✅ Validate fields before submit
//   const validate = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!formData.email.includes("@")) {
//       newErrors.email = "Valid email is required";
//     }
//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     return newErrors;
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors); // ❌ Show validation errors
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("${process.env.NEXT_PUBLIC_API_BASE}/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok && data.token) {
//         console.log("✅ Received Token:", data.token);
//         localStorage.setItem("token", data.token);
//         alert("Login successful!");
//         router.push("/dashboard");
//       } else {
//         localStorage.removeItem("token");
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong");
//       localStorage.removeItem("token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <BookOpen className="h-8 w-8 text-purple-600" />
//             <h1 className="text-2xl font-bold">My Diary</h1>
//           </div>
//           <CardTitle className="text-2xl">Welcome Back</CardTitle>
//           <CardDescription>Sign in to access your personal diary</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex items-center justify-between">
//               <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             <span className="text-gray-600">{"Don't have an account? "}</span>
//             <Link href="/signup" className="text-purple-600 hover:underline font-medium">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
