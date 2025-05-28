// useDeleteTask.ts
"use client"
import { supabase } from "@/lib/supabaseClient"

export const useDeleteTask = () => {
  const deleteTask = async (taskId: number) => {
    // Step 1: Get the task to find its boardId
    const { data: taskData, error: fetchError } = await supabase
      .from("Task")
      .select("boardId")
      .eq("id", taskId)
      .single()

    if (fetchError || !taskData) {
      console.error("❌ Failed to fetch task before deletion:", fetchError)
      return false
    }

    const boardId = taskData.boardId

    // Step 2: Fetch current taskCounter
    const { data: boardData, error: boardFetchError } = await supabase
      .from("Board")
      .select("taskCounter")
      .eq("id", boardId)
      .single()

    if (boardFetchError || !boardData) {
      console.error("❌ Failed to fetch board:", boardFetchError)
      return false
    }

    const currentCount = boardData.taskCounter

    // Step 3: Delete the task
    const { error: deleteError } = await supabase
      .from("Task")
      .delete()
      .eq("id", taskId)

    if (deleteError) {
      console.error("❌ Error deleting task:", deleteError)
      return false
    }

    // Step 4: Manually decrement taskCounter
    const { error: updateError } = await supabase
      .from("Board")
      .update({ taskCounter: Math.max(0, currentCount - 1) }) // prevent negative
      .eq("id", boardId)

    if (updateError) {
      console.error("❌ Error updating taskCounter:", updateError)
      return false
    }

    return true
  }

  return { deleteTask }
}
