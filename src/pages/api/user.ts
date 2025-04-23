import type { NextApiRequest, NextApiResponse } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/lib/database.types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createPagesServerClient<Database>({ req, res })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    console.error("Supabase user fetch error:", error)
    return res.status(401).json({ error: "Unauthorized" })
  }

  return res.status(200).json({
    name:
      user.user_metadata?.name ||
      `${user.user_metadata?.firstName ?? ""} ${user.user_metadata?.lastName ?? ""}`.trim() ||
      user.email?.split("@")[0],
    email: user.email,
    avatar: user.user_metadata?.avatar_url || "/default.jpeg",
  })
}
