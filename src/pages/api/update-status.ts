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

    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: prismaStatus,
      },
    });

    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
