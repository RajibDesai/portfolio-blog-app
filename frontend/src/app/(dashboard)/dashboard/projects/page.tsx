// frontend/src/app/(dashboard)/dashboard/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IProject } from '@/types'; // আপনার টাইপ ফাইল
import { Button  } from '@/components/ui/button';

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
          method: 'DELETE',
        });
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        console.error("Failed to delete project", error);
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <h1 className="text-3xl text-center text-primary font-bold mb-6">Manage Projects</h1>
      <Link href="/dashboard/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Project
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 border-2 border-secondary">
          <thead>
            <tr className="text-primary bg-gray-300">
              <th className="py-2 px-4 border-b w-8/12 text-start">Title</th>
              <th className="py-2 px-4 border-b w-4/12 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td className="py-2 px-4 border-b w-8/12">{project.title}</td>
                <td className="py-2 px-4 border-b space-x-2 w-4/12">
                  <Link href={`/dashboard/projects/edit/${project._id}`}>
                    <Button variant="link">Edit</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}