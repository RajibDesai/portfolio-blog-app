// frontend/src/app/public/projects/page.tsx
import ProjectCard from '@/components/ProjectCard';
import { IProject } from '@/types';

async function getAllProjects(): Promise<IProject[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </div>
  );
}