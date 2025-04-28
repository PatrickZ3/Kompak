"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabaseClient"
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

type DatabaseBoard = {
  id: string;
  title: string;
  description: string;
  taskCounter: number;
  dateCreated: string; 
};


type Board = {
  id: string;
  title: string;
  description: string;
  tasksCount: number;
  updatedAt: string; 
};

export default function Dashboard() {
  const router = useRouter();

  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false)
  const [newBoardName, setNewBoardName] = useState("")
  const [newBoardDescription, setNewBoardDescription] = useState("")

  const [boards, setBoards] = useState<Board[]>([])
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [currentUser, setCurrentUser] = useState<null | {
    name: string;
    email: string;
    avatar: string;
  }>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  const openNewBoardModal = () => {
    setNewBoardName("")
    setNewBoardDescription("")
    setIsNewBoardModalOpen(true)
  }

  const addNewBoard = async () => {
    if (!newBoardName.trim() || !currentUser) return;

    const user = await supabase.auth.getUser();

    const { data: boardData, error: boardError } = await supabase
      .from("Board")
      .insert([
        {
          title: newBoardName.trim(),
          description: newBoardDescription.trim() || "No description provided",
          boardCode: `PA-${Date.now()}`,
          creatorId: user.data.user?.id,
          dateCreated: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (boardError || !boardData) {
      console.error("Error creating board:", boardError);
      return;
    }

    const newBoardId = boardData.id;
    const taskId = boardData.title.split(" ").map((word: string) => word[0]).join("").toUpperCase();
    console.log("WOIIIII", taskId);
    console.log("Task Date:", new Date().toISOString());
    console.log("Local ISO-ish:", new Date().toISOString().split("T")[0]);

    const defaultTasks = [
      {
        taskKey: `${taskId}-1`,
        title: "Get started with Kompak",
        description: "This is a sample task in To Do",
        status: "TODO",
        priority: "LOW",
        boardId: newBoardId,
        dateCreated: new Date().toISOString(),
      },
      {
        taskKey: `${taskId}-2`,
        title: "Working on your first story",
        description: "This is a sample task in progress",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        boardId: newBoardId,
        dateCreated: new Date().toISOString(),
      },
      {
        taskKey: `${taskId}-3`,
        title: "Done with the first setup",
        description: "This is a completed sample task",
        status: "DONE",
        priority: "HIGH",
        boardId: newBoardId,
        dateCreated: new Date().toISOString(),
        dateFinish: new Date().toISOString(),
      },
    ];

    const { error: taskError } = await supabase.from("Task").insert(defaultTasks);
    console.log("📦 Tasks being inserted:", defaultTasks);


    if (taskError) {
      console.error("Error creating tasks:", taskError?.message, taskError?.details, taskError);
    }

    setBoards((prev) => [
      ...prev,
      {
        id: newBoardId,
        title: boardData.title,
        description: boardData.description,
        updatedAt: new Date(boardData.dateCreated).toLocaleDateString(),
        tasksCount: 3,
      },
    ]);

    setIsNewBoardModalOpen(false);
    router.push(`/board/${newBoardId}`);
  };


  const deleteBoard = (id: string) => {
    setBoards(boards.filter((board) => board.id !== id))
  }

  useEffect(() => {
    const fetchBoards = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Not logged in or failed to fetch user:", userError);
        return;
      }

      console.log("Logged-in user ID:", userData.user.id);

      const { data, error } = await supabase
        .from("Board")
        .select("*")
        .eq("creatorId", userData.user.id); 

      if (error) {
        console.error("Failed to fetch boards:", error);
      } else {
        console.log("Fetched boards:", data);

        setBoards(
          data.map((board: DatabaseBoard) => ({
            id: board.id,
            title: board.title,
            description: board.description,
            tasksCount: board.taskCounter,
            updatedAt: new Date(board.dateCreated).toLocaleDateString(),
          }))
        );
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to fetch user:", error.message);
        return;
      }
      if (user) {
        setCurrentUser({
          name:
            user.user_metadata.name ||
            `${user.user_metadata.firstName ?? ""} ${user.user_metadata.lastName ?? ""}`.trim() ||
            user.email?.split("@")[0] || "User",
          email: user.email || "unknown",
          avatar: user.user_metadata.avatar_url || "",
        });
      }
    }

    getUser()
  }, [])

  const logoSrc = resolvedTheme === "dark" ? "/logo.png" : "/logoReverse.png"

  if (!mounted) return null

  return (

    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center">
            <Image src={logoSrc} alt="Kompak Logo" width={120} height={60} />

          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8 text-sm text-secondary-foreground placeholder:text-muted-foreground"
              />
            </div>
            <ModeToggle />

          </div>

        </header>

        <div className="flex-1 overflow-auto bg-background p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary-foreground">Boards</h1>
            <Button
              onClick={openNewBoardModal}
              className="bg-red-500 text-primary-foreground hover:bg-red-600 cursor-pointer"
            >
              <Plus className="mr-0 h-4 w-4" />
              New Board
            </Button>
          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => router.push(`/board/${board.id}`)}
                className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-all hover:border-muted cursor-pointer"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-medium text-secondary-foreground">{board.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 bg-card text-secondary-foreground">
                      <DropdownMenuItem className="flex items-center hover:bg-muted">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center text-red-500 hover:bg-muted"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{board.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{board.updatedAt}</span>
                  <div className="flex items-center rounded-full bg-muted px-2 py-0.5">
                    <span className="text-xs text-secondary-foreground">{board.tasksCount} tasks</span>
                  </div>
                </div>
              </div>
            ))}

            {boards.length === 0 && (
              <button
                onClick={openNewBoardModal}
                className="flex h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-transparent p-4 transition-all hover:border-muted hover:bg-muted/20  cursor-pointer"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <span onClick={openNewBoardModal} className="text-sm text-muted-foreground">Create new board</span>
              </button>
            )}
          </div>
          {currentUser && (
            <div className="fixed bottom-4 left-4 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex h-auto items-center gap-2 px-3 py-2 hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar || "/avatar.png"} alt={currentUser.name} />
                      <AvatarFallback className="bg-muted text-secondary-foreground">
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs font-medium text-secondary-foreground">{currentUser.name}</span>
                      <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-card text-secondary-foreground">
                  <DropdownMenuItem className="flex items-center hover:bg-muted">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center text-red-500 hover:bg-muted"
                    onClick={async () => {
                      await supabase.auth.signOut()
                      window.location.href = "/"
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

        </div>
      </div>
      <Dialog open={isNewBoardModalOpen} onOpenChange={setIsNewBoardModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogDescription>Enter the details for your new project board.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="board-name" className="text-left">
                Board Name
              </Label>
              <Input
                id="board-name"
                placeholder="Enter board name"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="board-description" className="text-left">
                Description
              </Label>
              <Textarea
                id="board-description"
                placeholder="Enter board description"
                value={newBoardDescription}
                onChange={(e) => setNewBoardDescription(e.target.value)}
                className="col-span-3 h-24"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={addNewBoard}
              disabled={!newBoardName.trim()}
              className="bg-red-500 text-primary-foreground hover:bg-red-600"
            >
              Create New Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
