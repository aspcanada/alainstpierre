import { SendEmailCommand } from "@aws-sdk/client-ses"
import { sesClient } from "@/utils/ses"
import { type NextRequest } from "next/server"

interface ContactFormData {
  name: string
  email: string
  message: string
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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 