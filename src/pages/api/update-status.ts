import type { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

const STATUS_MAP = {
  "To Do": "TODO",
  "In Progress": "IN_PROGRESS",
  Done: "DONE",
} as const;

type SupabaseStatus = (typeof STATUS_MAP)[keyof typeof STATUS_MAP];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  try {
    const {
      taskId,
      newStatus,
    }: { taskId: number; newStatus: keyof typeof STATUS_MAP } = req.body;
    const supabaseStatus: SupabaseStatus = STATUS_MAP[newStatus];

    if (!supabaseStatus) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData: {
      status?: "TODO" | "IN_PROGRESS" | "DONE";
      dateFinish?: string | null;
    } = {
      status: supabaseStatus,
      dateFinish: supabaseStatus === "DONE" ? new Date().toISOString() : null,

    };

    const { error } = await supabase
      .from("Task")
      .update(updateData)
      .eq("id", taskId);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
