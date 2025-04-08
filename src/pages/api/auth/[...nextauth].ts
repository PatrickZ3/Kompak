import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "m@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Ensure that both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // If your User model has a unique email, use findUnique. Otherwise, use findFirst.
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        // If you haven't marked email as unique, use:
        // const user = await prisma.user.findFirst({ where: { email: credentials.email } });

        if (!user) {
          // No user found with this email
          return null;
        }

        // Compare the submitted password with the hashed password in the database
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          // Password did not match
          return null;
        }

        // If everything is valid, return the user object.
        // NextAuth expects an object with at least id, name, and email.
        return { id: user.id.toString(), name: user.firstName, email: user.email };
      },
    }),
  ],
  // Ensure you have a secret defined in your .env file as NEXTAUTH_SECRET
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
