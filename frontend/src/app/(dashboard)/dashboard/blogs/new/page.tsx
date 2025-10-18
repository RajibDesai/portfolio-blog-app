// frontend/src/app/(dashboard)/dashboard/blogs/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  title: string;
  content: string;
  category: string;
  image: FileList;
};

export default function NewBlogPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (data: FormValues) => {
    setErrors([]); // clear old errors

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category', data.category);

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, formData);
      router.push('/dashboard/blogs');
    } catch (error) {
      const err = error as AxiosError<{ message?: string; errors?: string[] }>;
      console.log("Error object from backend:", err.response);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors); // backend flat string array
      } else {
        setErrors([err.response?.data?.message || 'Upload failed']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-primary font-bold mb-6 text-center">Add New Blog Post</h1>

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
          <textarea {...register('content')} placeholder="Content" className="w-full p-2 border rounded" rows={5} required />
          <input {...register('category')} placeholder="Category" className="w-full p-2 border rounded" required />
          <input type="file" accept="image/*" {...register('image')} className="w-full p-2 border rounded" required />

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}