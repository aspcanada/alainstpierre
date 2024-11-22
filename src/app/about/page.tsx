import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  FacebookIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Alain St. Pierre. I live on Vancouver Island, where I harness AI and the cloud to shape smarter businesses.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Alain St. Pierre. I live on Vancouver Island, where I harness AI
            and the cloud to shape smarter businesses.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve always been a builder at heart. Growing up in the woods of
              Northern BC in the 1980s, I spent my days crafting elaborate forts
              from fallen branches, dreaming up entire worlds in the forest
              behind our house.
            </p>
            <p>
              When I was 14, everything changed. It was 1990, and my parents
              brought home our first computer. At the time, the “internet” was
              just a quiet network connecting universities and libraries. I was
              instantly hooked, spending hours tinkering, teaching myself to
              navigate this new digital frontier, and even dabbling in coding
              before I knew what coding really was.
            </p>
            <p>
              The only thing I loved more than technology was solving problems.
              In school, math and science were my favorite playgrounds, places
              where logic and creativity came together. When I wasn’t outside
              exploring or inside at my keyboard, I was dreaming about what I
              could make next.
            </p>
            <p>
              Today, I bring that same curiosity and drive to my work as an AI &
              Cloud Solutions Expert, helping businesses leverage technology to
              tackle big challenges. It’s the same joy of building and
              problem-solving I discovered as a kid—only now, the forts are in
              the cloud.
            </p>
            <p>
              At home, I’m a proud husband and father of four energetic boys.
              They remind me daily of the importance of curiosity, creativity,
              and always looking for the next adventure
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.facebook.com/alain.j.stpierre"
              icon={FacebookIcon}
            >
              Follow on Facebook
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/aspcanada/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/aspcanada"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/aspcanada"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:alain@aspcanada.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              alain@aspcanada.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
