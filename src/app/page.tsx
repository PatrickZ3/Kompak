"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, BarChart3, Clock, Menu, X, Code, Database, Layers } from "lucide-react"

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
          <div className="flex w-1/4 items-center justify-start">
            <Image src={logoSrc || "/placeholder.svg"} alt="Kompak Logo" width={120} height={60} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden w-2/4 items-center justify-center md:flex">
            <div className="flex items-center gap-8">
              <Link
                href="#kompak"
                className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
              >
                Kompak
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#techstack"
                className="text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors"
              >
                Tech Stack
              </Link>
              
            </div>
          </nav>

          <div className="flex w-1/4 items-center justify-end gap-4">
            <ModeToggle />
            <div className="hidden md:flex items-center gap-2 ">
              <Link href="/login">
                <Button variant="outline" className="h-9 cursor-pointer">
                  Log In
                </Button>
              </Link>
              <Link href="/registration">
                <Button className="h-9 bg-red-500 text-white hover:bg-red-600 cursor-pointer">Sign Up</Button>
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
              href="#kompak"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kompak
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#techstack"
              className="flex items-center justify-between rounded-md p-2 text-secondary-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tech Stack
              <ArrowRight className="h-4 w-4" />
            </Link>
          
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/registration" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-red-500 text-white hover:bg-red-600">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="kompak" className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-secondary-foreground">
                    Kompak
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Streamline your workflow with our intuitive project management platform
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/registration">
                    <Button className="bg-red-500 text-white hover:bg-red-600 cursor-pointer">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="cursor-pointer">Learn More</Button>
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
                  Kompak provides all the tools you need to organize, track and complete your projects efficiently.
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
                  Create and track tasks with ease. Set priorities and deadlines to stay on schedule.
                </p>
              </div>
              
              
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-secondary-foreground">Deadline Tracking</h3>
                <p className="text-muted-foreground">
                  Keep track of task due dates and ensure nothing slips through the cracks. Know exactly what’s due and what’s done.
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
                <h3 className="text-xl font-bold text-secondary-foreground">Boards</h3>
                <p className="text-muted-foreground">
                  Visualize your workflow with customizable boards. Drag and drop tasks to update their status.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="techstack"
          className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Tech Stack</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-secondary-foreground">
                  Built with modern technologies
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kompak is powered by cutting-edge technologies to provide a fast, reliable, and scalable experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black dark:text-white">
                    <path
                      fill="currentColor"
                      d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-foreground">Next.js</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    React framework for production with server-side rendering and static site generation
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Fast</div>
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">SEO-friendly</div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Code className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-foreground">shadcn/ui</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Accessible</div>
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Customizable</div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Database className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-foreground">Supabase</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Open source Firebase alternative with authentication, database, and storage
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Real-time</div>
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Secure</div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Layers className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-foreground">Prisma</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Next-generation ORM for Node.js and TypeScript with type-safety
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Type-safe</div>
                  <div className="rounded-full bg-muted px-3 py-1 text-xs">Intuitive</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5">
                <span className="text-sm font-medium text-secondary-foreground">
                  Built with TypeScript for type safety
                </span>
              </div>
              <div className="mt-8">
                <Link href="https://github.com/PatrickZ3/Kompak" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card py-6 md:py-8">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image src={logoSrc || "/placeholder.svg"} alt="Kompak Logo" width={100} height={50} />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kompak. All rights reserved.</p>
          </div>
          <div className="flex justify-end">
            {/* <Link href="#" className="text-sm text-muted-foreground hover:text-secondary-foreground">
              Contact
            </Link> */}
          </div>
        </div>
      </footer>
    </div>
  )
}
