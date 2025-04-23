import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient<Database>({ req, res });

  const boardId = Number(req.query.boardCode); // actually the board ID

  if (!boardId || isNaN(boardId)) {
    return res.status(400).json({ error: "Invalid board ID" });
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const userId = session.user.id;

  const { data: board, error: boardError } = await supabase
    .from("Board")
    .select("*")
    .eq("id", boardId)
    .eq("creatorId", userId)
    .single();

  if (boardError || !board) {
    console.error("Board fetch error:", boardError);
    return res.status(404).json({ error: "Board not found" });
  }

  const { data: tasks, error: taskError } = await supabase
    .from("Task")
    .select("*")
    .eq("boardId", board.id);

  if (taskError) {
    console.error("Task fetch error:", taskError);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }

  const formattedTasks = tasks.map((task) => ({
    id: task.id,
    story: task.title,
    storyID: task.taskKey || `TASK-${task.id}`,
    description: task.description,
    status: formatStatus(task.status),
    time: task.dateCreated,
    finishedTime: task.dateFinish,
    priority: formatPriority(task.priority),
    user: {
      avatar: "/avatars/shadcn.jpg",
      name: "Unassigned",
    },
  }));

  return res.status(200).json({
    boardTitle: board.title,
    tasks: formattedTasks,
  });
}

function formatStatus(status: string) {
  switch (status) {
    case "TODO":
      return "To Do";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
    default:
      return status;
  }
}

function formatPriority(priority: string) {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
}
