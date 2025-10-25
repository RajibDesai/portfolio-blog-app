// frontend/src/(public)/projects/[id]/page.tsx
import { IProject } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

/**
 * API থেকে প্রজেক্টের বিস্তারিত তথ্য নিয়ে আসে
 */
async function getProjectDetails(id: string): Promise<IProject | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Error fetching project: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error in getProjectDetails:', error);
    return null;
  }
}

// ✅ এখানে params কে Promise হিসেবে টাইপ করো
export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Async destructuring
  const project = await getProjectDetails(id);

  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 border-b pb-2">{project.title}</h1>

      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg mb-8 bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 hover:scale-[1.03]"
          priority
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Project Description</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.description}</p>
      </div>

      <div className="mt-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Technologies Used:</h3>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md transition hover:bg-indigo-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-4 border-t flex flex-col sm:flex-row gap-4">
        <Link
          href={project.liveLink}
          target="_blank"
          className="flex-1 text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition duration-300"
        >
          🚀 Live Demo
        </Link>
        <Link
          href={project.githubLink}
          target="_blank"
          className="flex-1 text-center bg-gray-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-900 transition duration-300"
        >
          <svg
            className="inline w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.864 8.165 6.837 9.5.5.092.682-.217.682-.483
                 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.157-1.107-1.465-1.107-1.465
                 -.908-.62.069-.608.069-.608 1.002.071 1.531 1.03 1.531 1.03.89 1.529 2.341 1.091 2.91.836
                 .091-.647.349-1.091.634-1.342-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.685
                 -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.029A9.57 9.57 0 0112 5.09c.84.004 1.684.113
                 2.493.336 1.91-1.3 2.75-1.029 2.75-1.029.544 1.378.201 2.397.098 2.65.639.701 1.029 1.594
                 1.029 2.685 0 3.833-2.335 4.688-4.566 4.935.359.307.68.919.68 1.851
                 0 1.342-.012 2.42-.012 2.744 0 .267.18.575.688.484C19.138 20.165 22 16.419
                 22 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          GitHub Repo
        </Link>
      </div>
    </div>
  );
}


