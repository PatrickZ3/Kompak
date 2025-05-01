import { supabase } from "@/lib/supabaseClient"

export const useDeleteBoard = () => {
  const deleteBoard = async (boardId: string) => {
    // 1. Delete all tasks related to this board
    const { error: taskError } = await supabase
      .from("Task")
      .delete()
      .eq("boardId", boardId)

    if (taskError) {
      console.error("Failed to delete related tasks:", taskError.message)
      alert("Failed to delete board tasks. Please try again.")
      return false
    }

    // 2. Then delete the board
    const { error: boardError } = await supabase
      .from("Board")
      .delete()
      .eq("id", boardId)

    if (boardError) {
      console.error("Failed to delete board:", boardError.message)
      alert("Failed to delete board. Please try again.")
      return false
    }

    alert("Board deleted successfully.")
    return true
  }

  return { deleteBoard }
}
