import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const supabase = createPagesServerClient<Database>({ req, res });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { boardId, title, description, priority, assigneeId } = req.body;

  // Validate
  if (!boardId || !title || !priority) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Generate taskKey from initials
  const taskKey = title
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  const { data, error } = await supabase.from("Task").insert([
    {
      boardId,
      title,
      description,
      priority,
      taskKey: `${taskKey}-${Date.now()}`,
      status: "TODO",
      assigneeId: assigneeId || null,
      dateCreated: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Insert task error:", error);
    return res.status(500).json({ message: "Failed to insert task", error });
  }

  return res.status(200).json({ message: "Task created successfully", data });
}
