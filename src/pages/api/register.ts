import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendVerificationEmail } from "../api/email";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Registration endpoint hit");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verified: false,
        verificationToken,
      },
    });
    console.log("User created:", user);

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "User creation failed" });
  }
}