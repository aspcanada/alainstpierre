import glob from 'fast-glob'

interface Project {
  name: string
  description: string
  logo: string
  title: string
}

export interface ProjectWithSlug extends Project {
  slug: string
}

async function importProject(
  projectFilename: string,
): Promise<ProjectWithSlug> {
  let { project } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    project: Project
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...project,
  }
}

export async function getAllProjects() {
  let projectFilenames = await glob('*/page.mdx', {
    cwd: './src/app/projects',
  })

  let projects = await Promise.all(projectFilenames.map(importProject))
  
  // return sorted list by filename (this way I can control what order is displayed via numeric prefixes)
  return projects.sort((a, b) => a.slug.localeCompare(b.slug))
} 