import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Verify the session using NextAuth.
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // 2. Retrieve the user's email from the session.
    const userEmail = session.user?.email;
    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized. No email provided." });
    }

    // 3. Find the user record in your database.
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    // 4. Get the boardCode from the query parameters, or default to "PA-1" if not provided.
    const boardCode = (req.query.boardCode as string) || "PA-1";

    // 5. Query for the board that belongs to the current user.
    const board = await prisma.board.findFirst({
      where: {
        boardCode: boardCode,
        creatorId: user.id, // Ensures that the board belongs to the current user.
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

    // 6. Format the tasks to match your front-end expectations.
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

    // 7. Send the response with board details.
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
