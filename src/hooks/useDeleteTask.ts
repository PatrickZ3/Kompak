// useDeleteTask.ts
"use client"
import { supabase } from "@/lib/supabaseClient"

let initialized = false

export const useDeleteTask = () => {
  if (!initialized) {
    // console.log("📦 useDeleteTask initialized")
    initialized = true
  }

  const deleteTask = async (taskId: number) => {
    // console.log("🧨 Trying to delete task with ID:", taskId)
    const { error } = await supabase.from("Task").delete().eq("id", taskId)

    // console.log("🔍 Supabase returned:", { data, error })

    if (error) {
    //   console.error("❌ Supabase delete error:", error.message)
      return false
    }

    return true
  }

  return { deleteTask }
}
