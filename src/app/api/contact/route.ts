import { SendEmailCommand } from "@aws-sdk/client-ses"
import { sesClient } from "@/utils/ses"
import { type NextRequest } from "next/server"

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface ContactFormData {
  name: string
  email: string
  message: string
  captchaToken: string
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5 // 5 requests per 15 minutes

// Input validation limits
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 2000

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429 }
      )
    }

    const body = (await request.json()) as ContactFormData

    // Sanitize and validate input
    const sanitizedData = sanitizeInputs(body)
    const validationError = validateInputs(sanitizedData)
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400 }
      )
    }

    // Verify CAPTCHA token
    if (!sanitizedData.captchaToken) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification required" }),
        { status: 400 }
      )
    }

    const captchaValid = await verifyCaptcha(sanitizedData.captchaToken)
    if (!captchaValid) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
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
            Data: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`,
            Charset: "UTF-8",
          },
        },
        Subject: {
          Data: `New Contact Form Submission from ${sanitizedData.name} (alainstpierre.com)`,
          Charset: "UTF-8",
        },
      },
      Source: process.env.CONTACT_EMAIL_FROM!,
      ReplyToAddresses: [sanitizedData.email],
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

// Rate limiting functions
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(",")[0].trim()
  
  return "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }
  
  record.count++
  return true
}

// Input sanitization functions
function sanitizeInputs(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeString(data.name, MAX_NAME_LENGTH),
    email: sanitizeString(data.email, MAX_EMAIL_LENGTH).toLowerCase(),
    message: sanitizeString(data.message, MAX_MESSAGE_LENGTH),
    captchaToken: data.captchaToken,
  }
}

function sanitizeString(input: string, maxLength: number): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/[\r\n\t]/g, " ") // Normalize whitespace
}

function validateInputs(data: ContactFormData): string | null {
  // Check required fields
  if (!data.name || !data.email || !data.message) {
    return "All fields are required"
  }
  
  // Check field lengths
  if (data.name.length === 0 || data.name.length > MAX_NAME_LENGTH) {
    return "Name must be between 1 and 100 characters"
  }
  
  if (data.email.length === 0 || data.email.length > MAX_EMAIL_LENGTH) {
    return "Email must be between 1 and 254 characters"
  }
  
  if (data.message.length === 0 || data.message.length > MAX_MESSAGE_LENGTH) {
    return "Message must be between 1 and 2000 characters"
  }
  
  // Validate email format
  if (!isValidEmail(data.email)) {
    return "Invalid email address"
  }
  
  // Check for suspicious content
  if (containsSuspiciousContent(data.message)) {
    return "Message contains suspicious content"
  }
  
  return null
}

function containsSuspiciousContent(message: string): boolean {
  const suspiciousPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs
    /[A-Z]{10,}/g, // Excessive caps
    /(.)\1{4,}/g, // Repeated characters
    /(.)\1{3,}/g, // Repeated characters (less strict)
  ]
  
  return suspiciousPatterns.some(pattern => pattern.test(message))
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 