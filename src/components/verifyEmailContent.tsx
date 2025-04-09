"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { CheckCircle2, XCircle, Loader2, LogIn, RefreshCcw, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"

export default function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)

    async function verifyEmail() {
      try {
        setStatus("loading")
        if (!token) {
          setStatus("error")
          setMessage("Invalid verification token. Please check your email and try again.")
          return
        }
        const response = await fetch(`/api/verify-email?token=${token}`)
        const data = await response.json()
        if (response.ok) {
          setStatus("success")
          setMessage(data.message)
        } else {
          setStatus("error")
          setMessage(data.error || "Verification failed.")
        }
      } catch (error) {
        console.error("Error verifying email:", error)
        setStatus("error")
        setMessage("An error occurred while verifying your email. Please try again later.")
      }
    }
    verifyEmail()
  }, [token])

  if (!mounted) return null
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
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-red-500" />
              <h1 className="text-2xl font-bold text-secondary-foreground">Verifying Your Email</h1>
              <p className="text-muted-foreground">Please wait while we verify your email address...</p>
            </div>
          )}
          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-foreground">Email Verified!</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                <p className="text-sm text-green-800 dark:text-green-400">
                  Your account is now active. You can access all features of Kompak.
                </p>
              </div>
              <div className="pt-4">
                <Button asChild className="bg-red-500 text-primary-foreground hover:bg-red-600">
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
              <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                <p className="text-sm text-red-800 dark:text-red-400">
                  {!token
                    ? "No verification token was found. Please use the link from your email."
                    : "The verification link may have expired or is invalid. Please request a new verification email."}
                </p>
              </div>
              <div className="flex flex-col space-y-2 pt-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                {!token ? (
                  <Button asChild variant="outline" className="border-border text-secondary-foreground">
                    <Link href="/login">
                      <Mail className="mr-2 h-4 w-4" />
                      Check Your Email
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="border-border text-secondary-foreground" onClick={() => {
                    setStatus("loading");
                    (async () => {
                      try {
                        if (!token) {
                          setStatus("error");
                          setMessage("Invalid verification token. Please check your email and try again.");
                          return;
                        }
                        const response = await fetch(`/api/verify-email?token=${token}`);
                        const data = await response.json();
                        if (response.ok) {
                          setStatus("success");
                          setMessage(data.message);
                        } else {
                          setStatus("error");
                          setMessage(data.error || "Verification failed.");
                        }
                      } catch (error) {
                        console.error("Error verifying email:", error);
                        setStatus("error");
                        setMessage("An error occurred while verifying your email. Please try again later.");
                      }
                    })();
                  }}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                )}
                <Button asChild className="bg-red-500 text-primary-foreground hover:bg-red-600">
                  <Link href="/login">Go to Login</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
