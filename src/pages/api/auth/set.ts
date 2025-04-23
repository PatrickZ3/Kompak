import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient({ req, res })

  const { session } = req.body

  await supabase.auth.setSession(session)

  res.status(200).end()
}
