import { NextApiRequest, NextApiResponse } from "next";
import { sendVerificationEmail } from "../api/email"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const testEmail = "patzesantoso@gmail.com"; 
      const token = "testing-token";
  
      const result = await sendVerificationEmail(testEmail, token);
      return res.status(200).json({ message: "Test email sent", result });
    } catch (error: any) {
      console.error("Send Email Error:", error?.message || error);
      return res.status(500).json({ error: error?.message || "Failed to send email" });
    }
  }
