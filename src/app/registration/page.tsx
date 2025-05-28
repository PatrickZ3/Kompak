"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { ModeToggle } from "@/components/ModeToggle"
import { useRouter } from "next/navigation"

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  
  const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password)
  

  const handleRegister = async () => {
    if (!isValidEmail(form.email)) {
        alert("Invalid email format")
        return
      }
    
      if (!isStrongPassword(form.password)) {
        alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.")
        return
      }
    
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match")
        return
      }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (res.ok) { 
        alert("Registration successful!")
        router.push("/login");
      } else {
        alert(data.error || "Something went wrong")
      }
    } catch (error) {
      alert("Something went wrong")
      console.error(error)
    }
  }

  if (!mounted) return null
  const logoSrc = theme === "dark" ? "/logo.png" : "/logoReverse.png"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center">
            <Image src={logoSrc || "/placeholder.svg"} alt="Kompak Logo" width={120} height={60} />
          </div>
          <ModeToggle />
        </header>

        {/* Registration form */}
        <div className="flex flex-1 items-center justify-center bg-background p-4">
          <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-secondary-foreground">Create an Account</h1>
              <p className="text-sm text-muted-foreground">Sign up to get started with Kompak</p>
            </div>

            <div className="space-y-7">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-3.5">
                  <Label htmlFor="firstName" className="text-secondary-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="border-border bg-input text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-3.5">
                  <Label htmlFor="lastName" className="text-secondary-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="border-border bg-input text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-3.5">
                <Label htmlFor="email" className="text-secondary-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-border bg-input text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-3.5">
                <Label htmlFor="password" className="text-secondary-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border-border bg-input pr-10 text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary-foreground"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3.5">
                <Label htmlFor="confirmPassword" className="text-secondary-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="border-border bg-input pr-10 text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary-foreground"
                  >
                    {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              {/* <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  className="mt-1 border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="#" className="font-medium text-secondary-foreground hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-medium text-secondary-foreground hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div> */}

              <Button onClick={handleRegister} className="w-full bg-red-500 text-primary-foreground hover:bg-red-600">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-border bg-input text-secondary-foreground hover:bg-muted">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="border-border bg-input text-secondary-foreground hover:bg-muted">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div> */}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-secondary-foreground hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

