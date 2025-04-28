"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import {  ArrowRight, Calendar, Users, BarChart3, Clock, Menu, X } from "lucide-react"

export default function HomePage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = resolvedTheme === "dark" ? "/logo.png" : "/logoReverse.png"

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-sm">
        <div className=" flex h-16 items-center justify-between px-4 md:px-6 ">
          <div className="flex items-center gap-2">
            <Image src={logoSrc || "/placeholder.svg"} alt="Kompak Logo" width={120} height={60} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#information"
              className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              Information
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" className="h-9">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="h-9 bg-red-500 text-white hover:bg-red-600">Sign Up</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background md:hidden">
          <nav className="container flex flex-col gap-4 p-4">
            <Link
              href="#features"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#testimonials"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-red-500 text-white hover:bg-red-600">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-secondary-foreground">
                    Kompak
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Streamline your workflow with our intuitive project management platform
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="bg-red-500 text-white hover:bg-red-600">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
                
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-border bg-card p-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-blue-500/20 opacity-50"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-background">
                    <div className="flex h-8 items-center border-b border-border bg-muted px-4">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-4">
                          <div className="h-4 w-3/4 rounded bg-muted"></div>
                          <div className="space-y-2">
                            <div className="h-3 w-full rounded bg-muted"></div>
                            <div className="h-3 w-full rounded bg-muted"></div>
                            <div className="h-3 w-2/3 rounded bg-muted"></div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-10 rounded-md bg-red-500"></div>
                          <div className="h-3 w-full rounded bg-muted"></div>
                          <div className="h-3 w-full rounded bg-muted"></div>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="h-24 rounded-lg border border-border bg-card p-2">
                            <div className="h-3 w-3/4 rounded bg-muted"></div>
                            <div className="mt-2 h-2 w-1/2 rounded bg-muted"></div>
                            <div className="mt-4 h-8 w-8 rounded-full bg-muted"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-secondary-foreground">
                  Everything you need to manage projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kompak provides all the tools you need to organize, track, and complete your projects efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Task Management</h3>
                <p className="text-muted-foreground">
                  Create, assign, and track tasks with ease. Set priorities and deadlines to stay on schedule.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Work together seamlessly with your team. Share updates, files, and feedback in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <BarChart3 className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor project progress with visual dashboards and detailed reports to keep stakeholders informed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Time Management</h3>
                <p className="text-muted-foreground">
                  Track time spent on tasks and projects. Analyze productivity and optimize your workflow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center md:col-span-2 lg:col-span-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                  >
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Kompak Boards</h3>
                <p className="text-muted-foreground">
                  Visualize your workflow with customizable boards. Drag and drop tasks to update their status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-secondary-foreground">
                  Ready to streamline your workflow?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of teams already using Kompak to manage their projects more efficiently.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button className="bg-red-500 text-white hover:bg-red-600">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Image src={logoSrc || "/placeholder.svg"} alt="Kompak Logo" width={100} height={50} />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kompak. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-secondary-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-secondary-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-secondary-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
