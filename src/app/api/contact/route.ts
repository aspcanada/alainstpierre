import { SendEmailCommand } from "@aws-sdk/client-ses"
import { sesClient } from "@/utils/ses"
import { type NextRequest } from "next/server"

interface ContactFormData {
  name: string
  email: string
  message: string
  captchaToken: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData

    // Validate input
    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      )
    }

    // Verify CAPTCHA token
    if (!body.captchaToken) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification required" }),
        { status: 400 }
      )
    }

    const captchaValid = await verifyCaptcha(body.captchaToken)
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
        { status: 400 }
      )
    }

    if (!isValidEmail(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400 }
      )
    }

    const params = {
      Destination: {
        ToAddresses: [process.env.CONTACT_EMAIL_TO!],
      },
      Message: {
        Body: {
          Text: {
            Data: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
            Charset: "UTF-8",
          },
        },
        Subject: {
          Data: `New Contact Form Submission from ${body.name}`,
          Charset: "UTF-8",
        },
      },
      Source: process.env.CONTACT_EMAIL_FROM!,
      ReplyToAddresses: [body.email],
    }

    const command = new SendEmailCommand(params)
    await sesClient.send(command)

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    )
  }
}

async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    })

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error("CAPTCHA verification error:", error)
    return false
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 