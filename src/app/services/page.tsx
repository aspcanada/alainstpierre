import { type Metadata } from 'next'
import Image from 'next/image'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { type StaticImageData } from 'next/image'

import aiSystemsImage from '@/images/services/ai-systems.jpg'
import cloudSolutionsImage from '@/images/services/cloud-solutions.jpg'
import strategyConsultImage from '@/images/services/strategy-consulting.jpg'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI and cloud solutions to help your business grow and scale.',
}

function ServiceSection({
  title,
  children,
  imageSrc,
  imageAlt,
  isReversed = false,
}: {
  title: string
  children: React.ReactNode
  imageSrc: string | StaticImageData
  imageAlt: string
  isReversed?: boolean
}) {
  return (
    <section className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div
        className={`flex flex-col gap-8 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        <div className="md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            {title}
          </h2>
          <div className="mt-6 space-y-6 text-base text-zinc-600 dark:text-zinc-400">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex">
          <span className="mr-2 text-teal-500">•</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Services() {
  return (
    <SimpleLayout
      title="AI and Cloud Solutions for Your Business"
      intro="Hi, I'm here to help small and medium-sized businesses harness the power of technology to streamline operations, adopt cloud solutions, and implement AI to drive growth. Whether you're looking to automate workflows, transition to the cloud, or make smarter use of AI, I offer services designed to make your business run more efficiently."
    >
      <div className="space-y-24">
        <ServiceSection
          title="AI-Powered Business Systems"
          imageSrc={aiSystemsImage}
          imageAlt="AI-powered business systems illustration"
        >
          <p>
            Streamline your workflows and scale smarter. Repetitive tasks and
            inefficiencies can hold your business back. I design and implement
            AI-powered systems that automate your operations, reduce errors, and
            free up your team to focus on what matters most: growth.
          </p>
          <h3 className="mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
            Here&apos;s How I Can Help:
          </h3>
          <ServiceList
            items={[
              'Automating manual workflows to save you time and effort',
              'Creating tailored solutions for customer service, content management, and operations',
              'Developing standard operating procedures to make AI integration seamless and effective',
            ]}
          />
          <p className="mt-6">
            With smarter systems, you&apos;ll see increased productivity, fewer
            errors, and a noticeable boost in profitability.
          </p>
        </ServiceSection>

        <ServiceSection
          title="Cloud Solutions with AWS"
          imageSrc={cloudSolutionsImage}
          imageAlt="Cloud solutions architecture diagram"
          isReversed
        >
          <p>
            The cloud isnt just for big enterprises—it&apos;s a game-changer for
            small and medium-sized businesses, too. As an AWS Solutions
            Architect, I help businesses like yours transition to the cloud,
            improve efficiency, reduce costs, and scale with confidence.
          </p>
          <h3 className="mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
            What I Offer:
          </h3>
          <ServiceList
            items={[
              'Migrating your systems to AWS for improved performance and reliability',
              'Building secure, scalable cloud architectures that fit your needs',
              'Optimizing existing cloud systems to reduce costs and increase efficiency',
            ]}
          />
          <p className="mt-6">
            From storage and computing to security and automation, AWS solutions
            can help your business unlock new levels of flexibility and control.
          </p>
        </ServiceSection>

        <ServiceSection
          title="AI and Cloud Strategy Consulting"
          imageSrc={strategyConsultImage}
          imageAlt="Strategic planning and consulting session"
        >
          <p>
            Adopting AI and cloud technology can feel overwhelming, but it
            doesn&apos;t have to be. I&apos;ll work with you to simplify the
            process and help you get the most out of these powerful tools.
          </p>
          <h3 className="mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
            Here&apos;s How I Can Help:
          </h3>
          <ServiceList
            items={[
              'Auditing your workflows and infrastructure to uncover inefficiencies',
              'Recommending AI and cloud-based solutions tailored to your business needs',
              'Creating a step-by-step roadmap to implement these solutions successfully',
            ]}
          />
          <p className="mt-6">
            I&apos;ll take the complexity out of technology so you can focus on
            running and growing your business.
          </p>
        </ServiceSection>

        <div className="mt-16 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Let&apos;s Transform Your Business Together
          </h2>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            If you&apos;re ready to unlock the potential of AI and cloud
            technology, I&apos;d love to help. Reach out today to schedule a
            consultation and take the first step toward smarter, more efficient
            operations.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@alainstpierre.com">Get Started</Button>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
