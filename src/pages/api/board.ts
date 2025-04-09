import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized. No email provided." });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const boardCode = (req.query.boardCode as string) || "PA-1";

    const board = await prisma.board.findFirst({
      where: {
        boardCode: boardCode,
        creatorId: user.id, 
      },
      include: {
        tasks: {
          include: {
            assignee: true,
          },
        },
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const formattedTasks = board.tasks.map((task) => ({
      id: task.id,
      story: task.title,
      storyID: task.taskKey,
      description: task.description,
      status: formatStatus(task.status),
      time: task.dateCreated,
      finishedTime: task.dateFinish,
      priority: formatPriority(task.priority),
      user: {
        avatar: "/avatars/shadcn.jpg",
        name: task.assignee?.firstName || "Unassigned",
      },
    }));

    res.status(200).json({
      boardTitle: board.title,
      tasks: formattedTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch board data" });
  }
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
