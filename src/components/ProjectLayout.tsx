'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ProjectWithSlug } from '@/lib/projects'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProjectLayout({
  project,
  children,
}: {
  project: ProjectWithSlug
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  useEffect(() => {
    document.title = `Case Study: ${project.name}`
  }, [project.name])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to projects"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10">
                  <Image
                    src={project.logo}
                    alt={project.title}
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-4">
                  <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    {project.name}
                  </h1>
                  <div className="mt-1 text-zinc-500">
                    {project.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border-b border-t border-zinc-200/50">
              {/* <div className="mx-auto max-w-4xl p-4">
                <div className="prose-zinc prose text-zinc-600">{children}</div>
              </div> */}
              <Prose className="mt-8" data-mdx-content>
                {children}
              </Prose>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
