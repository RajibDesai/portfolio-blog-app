import Link from 'next/link';
import Image from 'next/image';
import { IProject } from '@/types';

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Link href={`/projects/${project._id}`}>
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 line-clamp-2">{project.description}</p>
        </div>
      </Link>
    </div>
  );
}