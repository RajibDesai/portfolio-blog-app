// frontend/src/app/(dashboard)/dashboard/projects/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  technologies: string;
  image: FileList;
};

export default function NewProjectPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (data: FormValues) => {
    setErrors([]); // clear old errors
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('liveLink', data.liveLink);
    formData.append('githubLink', data.githubLink);

    const technologiesArray = data.technologies.split(',').map(t => t.trim());
    formData.append('technologies', JSON.stringify(technologiesArray));

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, formData);
      router.push('/dashboard/projects');
    } catch (error) {
      const err = error as AxiosError<{ message?: string; errors?: string[] }>;
      console.log("Error object from backend:", err.response);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors); // flat string array from backend
      } else {
        setErrors([err.response?.data?.message || 'Upload failed']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-primary font-bold mb-6 text-center">Add New Project</h1>

        {/* Show backend validation errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-gray-100 text-red-700 rounded">
            <ul className="list-disc ml-4">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('title')} placeholder="Title" className="w-full p-2 border rounded" required />
          <textarea {...register('description')} placeholder="Description" className="w-full p-2 border rounded" required />
          <input type="file" accept="image/*" {...register('image')} className="w-full p-2 border rounded" required />
          <input {...register('liveLink')} type="url" placeholder="Live Link" className="w-full p-2 border rounded" required />
          <input {...register('githubLink')} type="url" placeholder="GitHub Link" className="w-full p-2 border rounded" required />
          <input {...register('technologies')} placeholder="React, Next.js" className="w-full p-2 border rounded" required />

          <div className="text-center">
            <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
             disabled={isSubmitting}
              >
             {isSubmitting ? 'Uploading...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

