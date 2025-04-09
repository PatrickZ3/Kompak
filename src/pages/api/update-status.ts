import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

const STATUS_MAP: Record<string, TaskStatus> = {
  "To Do": "TODO",
  "In Progress": "IN_PROGRESS",
  "Done": "DONE",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { taskId, newStatus } = req.body;
    const prismaStatus = STATUS_MAP[newStatus];

    if (!prismaStatus) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData: Partial<{ status: TaskStatus; dateFinish: Date | null }> = {
      status: prismaStatus,
    };

    if (prismaStatus === "DONE") {
      updateData.dateFinish = new Date(); 
    } else {
      updateData.dateFinish = null; 
    }

    await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    res.status(200).json({ message: "Status + finish date updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
