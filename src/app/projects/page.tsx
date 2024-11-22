import { type ProjectWithSlug, getAllProjects } from '@/lib/projects'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Project } from '@/components/ProjectLayout'

export const metadata = {
  title: 'Projects',
  description: "Things I've made trying to put my dent in the universe.",
}

export default async function Projects() {
  let projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Things I've made trying to put my dent in the universe."
      intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </ul>
    </SimpleLayout>
  )
}
