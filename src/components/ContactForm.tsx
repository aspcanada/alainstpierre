"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/Button"

type FormStatus = "idle" | "submitting" | "success" | "error"

interface FormData {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus("error")
      console.error("Error submitting form:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-2 block w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-zinc-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-2 block w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-zinc-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="mt-2 block w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-zinc-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && (
          <p className="mt-4 text-sm text-green-600">
            Thank you! Your message has been sent successfully.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600">
            An error occurred. Please try again.
          </p>
        )}
      </div>
    </form>
  )
} 