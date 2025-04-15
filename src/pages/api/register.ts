import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName
        },
        
      }
    });

    if (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("User created:", data.user);

    return res.status(201).json({ message: "User created", user: data.user });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "User creation failed" });
  }
}