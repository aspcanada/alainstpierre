import { type Metadata } from "next"
import { SimpleLayout } from "@/components/SimpleLayout"
import { ContactForm } from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me to discuss how I can help your business.",
}

export default function Contact() {
  return (
    <SimpleLayout
      title="Get in Touch"
      intro="Have a question or ready to transform your business? Fill out the form below and I'll get back to you as soon as possible."
    >
      <div className="mt-16 sm:mt-20">
        <ContactForm />
      </div>
    </SimpleLayout>
  )
} 