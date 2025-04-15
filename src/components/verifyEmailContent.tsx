"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { CheckCircle2, XCircle, Loader2, LogIn, RefreshCcw, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/router"

export default function VerifyEmailContent() {
  const [status, setStatus] = useState<"waiting" | "verified" | "error">("waiting")
  const [message, setMessage] = useState("Please check your email and click on the verification link.")
  const { theme } = useTheme()
  const router = useRouter()

  // Function to check user verification status
  async function checkVerification() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session && session.user.email_confirmed_at) {
      setStatus("verified")
      setMessage("Your email has been verified! You can now log in.")
    } else {
      setStatus("waiting")
      setMessage("Your email is not verified yet. Please check your inbox, then click 'Refresh'.")
    }
  }

  useEffect(() => {
    // Remove URL hash if present (this will clean up the access token from the URL)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    // Now check the verification status after cleaning the URL
    checkVerification()
  }, [])

  const logoSrc = theme === "dark" ? "/logo.png" : "/logoReverse.png"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center">
          <Image src={logoSrc || "/placeholder.svg?height=60&width=120"} alt="Kompak Logo" width={120} height={60} />
        </div>
        <ModeToggle />
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-center shadow-sm">
          {status === "waiting" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <h1 className="text-2xl font-bold text-secondary-foreground">Verify Your Email</h1>
              <p className="text-muted-foreground">{message}</p>
              <Button variant="outline" onClick={checkVerification}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          )}
          {status === "verified" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-foreground">Email Verified!</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="pt-4">
                <Button asChild className="bg-blue-500 text-primary-foreground hover:bg-blue-600">
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Go to Login
                  </Link>
                </Button>
              </div>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-red-500">Error</h1>
              <p className="text-muted-foreground">{message}</p>
              <Button asChild variant="outline">
                <Link href="/login">
                  <Mail className="mr-2 h-4 w-4" />
                  Return to Login
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
