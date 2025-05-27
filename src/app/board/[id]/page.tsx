  "use client"
  import { useState, useEffect } from "react"
  import { useParams, useRouter } from "next/navigation"
  import { AppSidebar } from "@/components/app-sidebar"
  import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
  import Board from "@/components/board" 
  import { supabase } from "@/lib/supabaseClient"

  export default function Home() {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()

    const [boardTitle, setBoardTitle] = useState("Loading...");
    const [refreshCount, setRefreshCount] = useState(0);

    const refreshTasks = () => setRefreshCount(prev => prev + 1)

    useEffect(() => {
      if (!id) return

      const fetchBoard = async () => {
        const { data, error } = await supabase
          .from("Board")
          .select("title")
          .eq("id", id)
          .single()

        if (error || !data) {
          console.error("Board not found:", error)
          router.push("/dashboard")
          return
        }
        console.log("Fetched board data:", data)
        setBoardTitle(data.title)
      }

      fetchBoard()
    }, [id, router])

    return (
      <SidebarProvider>
        <AppSidebar
          variant="inset"
          activeView="Board" 
          onNavigate={() => {}}
          boardTitle={boardTitle}
          boardId={id}
          onRefreshTasks={refreshTasks} 
        />
        <SidebarInset>
          <Board boardId={id} refreshCount={refreshCount} />
        </SidebarInset>
      </SidebarProvider>
    );
  }
