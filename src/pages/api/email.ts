import { Resend } from 'resend'

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, token: string) {
  const confirmLink = `http://localhost:3000/verify-email?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Verify your email for Kompak',
    html: `
    <h1>Welcome to Kompak!</h1>
    <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
    <p>If you didn't create an account, you can ignore this email.</p>
    <p>To verify your email, please click the link below:</p>
    <p><strong>${confirmLink}</strong></p>
    <p>If the button doesn't work, copy and paste the link into your browser.</p>
    <p>If you have any questions, feel free to reach out to us.</p>
    <p>Best regards,</p>
    <p>The Kompak Team</p>
    <p>Note: This is an automated message. Please do not reply.</p>
    `,
  })

  if (error) {
    throw new Error(`Email not sent: ${error.message}`)
  }

  return data
}
