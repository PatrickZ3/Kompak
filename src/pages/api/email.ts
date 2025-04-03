import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, token: string) {
  const confirmLink = `http://localhost:3000/verify-email?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Verify your email for Kompak',
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`,
  })

  if (error) {
    throw new Error(`Email not sent: ${error.message}`)
  }

  return data
}
