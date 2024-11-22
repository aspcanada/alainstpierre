import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export const metadata: Metadata = {
  title: 'InvestDirect - Real Estate Investment Platform',
  description:
    'A platform connecting real estate entrepreneurs with private investors in Canada.',
}

export default function InvestDirectCase() {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                InvestDirect
              </h1>
              <div className="order-first text-base text-zinc-400 dark:text-zinc-500">
                Real Estate Investment Platform
              </div>
            </header>
            <Prose className="mt-8">
              <h2>Overview</h2>
              <p>
                InvestDirect is a groundbreaking platform that empowers real
                estate entrepreneurs and private investors to connect,
                collaborate, and capitalize on diverse investment opportunities.
                Inspired by similar platforms in the U.S., it's designed to
                bridge the gap between private borrowers and lenders in Canada,
                offering a social network tailored to real estate investments.
              </p>

              <h2>The Challenge</h2>
              <p>
                The private lending and borrowing market often relies on
                fragmented networks and outdated processes, making it
                challenging for investors and entrepreneurs to find reliable
                partners. The goal was to create a unified platform that
                streamlines these connections while providing robust tools for
                managing investments.
              </p>

              <h2>Solution</h2>
              <p>
                InvestDirect brings together cutting-edge technology and
                user-centric design to create a seamless experience for users.
              </p>

              <h3>Core Features</h3>
              <ul>
                <li>
                  Investment Opportunities: A curated marketplace featuring
                  residential and commercial real estate projects
                </li>
                <li>
                  Network Building: Tools to connect with private investors and
                  borrowers across Canada
                </li>
                <li>
                  User Profiles: Tailored profiles showcasing investment
                  history, opportunities, and goals
                </li>
                <li>
                  Real-Time Notifications: Keep users updated on new
                  opportunities and connections
                </li>
                <li>
                  Secure Transactions: Built-in mechanisms to ensure secure,
                  transparent dealings between parties
                </li>
              </ul>

              <h3>Tech Stack</h3>
              <p>
                Built using the features and architecture of Nextless.js,
                enabling:
              </p>
              <ul>
                <li>
                  Server-side rendering (SSR) for fast and efficient performance
                </li>
                <li>
                  Scalable API infrastructure to handle a growing user base
                </li>
                <li>
                  Integrated payment and subscription systems for premium
                  features
                </li>
                <li>
                  Modern, responsive design optimized for both desktop and
                  mobile
                </li>
              </ul>

              <h2>Key Outcomes</h2>
              <ul>
                <li>
                  Empowered Investors: Users gained access to a wider range of
                  opportunities and tools to manage their portfolios effectively
                </li>
                <li>
                  Strengthened Networks: Facilitated connections among investors
                  and entrepreneurs, fostering a collaborative ecosystem
                </li>
                <li>
                  Scalable Architecture: The platform is designed to grow
                  alongside user demands, ensuring long-term viability
                </li>
              </ul>

              <h2>Personal Contribution</h2>
              <p>As the project creator, I:</p>
              <ul>
                <li>
                  Conceptualized and designed the platform, focusing on the
                  needs of private borrowers and lenders
                </li>
                <li>
                  Implemented Nextless.js features to build a modern, scalable
                  application
                </li>
                <li>
                  Oversaw the integration of user-centric features such as
                  real-time notifications, secure transactions, and responsive
                  design
                </li>
                <li>Ensured compliance with Canadian investment regulations</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                InvestDirect represents the future of private real estate
                investment networks in Canada. By leveraging advanced technology
                and an intuitive design, it connects investors and
                entrepreneurs, fostering growth and collaboration in the real
                estate market.
              </p>
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
