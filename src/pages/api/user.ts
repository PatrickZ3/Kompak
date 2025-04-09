import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return res.status(401).json({ error: "No email found in session" });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentUser = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: "/default.jpeg"  
      // avatar: user.avatar || "/default.jpeg", after implement image upload
    };

    return res.status(200).json(currentUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
