import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-8">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Tools',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Tools() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M1, 16GB RAM (2021)">
            I was using an Intel-based 15” MacBook Pro prior to this and the
            difference is night and day. I’ve never heard the fans turn on a
            single time, even under the incredibly heavy loads I put it through
            with our various build scripts.
          </Tool>
          <Tool title="27” Apple Cinema Display">
            While it's an older model now, this display still delivers excellent
            color accuracy and a crisp, clear picture. The built-in USB hub and
            speakers make it a clean, minimalist setup that has served me well
            for years.
          </Tool>
          <Tool title="Apple Wireless Keyboard">
            I've been using this keyboard for years and it's still going strong.
          </Tool>
          <Tool title="Apple Magic Trackpad">
            Something about all the gestures makes me feel like a wizard with
            special powers. I really like feeling like a wizard with special
            powers.
          </Tool>
          <Tool title="Steelcase Leap Chair">
            If I’m going to slouch in the worst ergonomic position imaginable
            all day, I might as well do it in an expensive chair.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Cursor AI">
            I've just started using Cursor AI and it's already a game changer.
            It's the fastest way I've found to get from idea to code.
          </Tool>
          <Tool title="iTerm2">
            I’m honestly not even sure what features I get with this that aren’t
            just part of the macOS Terminal but it’s what I use.
          </Tool>
          <Tool title="ChatGPT">
            ChatGPT has become an indispensable part of my workflow, helping me
            quickly solve problems and find answers to complex questions.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Trello">
            I've been using Trello for years and it's still my go-to tool for
            project management.
          </Tool>
          <Tool title="Google Suite">
            I use Google Suite for all of my email, calendar, and document
            storage needs.
          </Tool>
          <Tool title="Calendly">
            Calendly is my preferred tool for scheduling meetings. It's a great
            way to protect my calendar and make sure I still have lots of time
            for deep work during the week.
          </Tool>
          <Tool title="Hubspot">
            I use HubSpot to manage all my customer relationships and marketing
            campaigns. The platform helps me stay organized and build meaningful
            connections with clients.
          </Tool>
          <Tool title="Spotify">
            I use Spotify to listen to music while I work. It's a great way to
            stay focused and get into the zone.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
