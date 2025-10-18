// frontend/src/app/(dashboard)/dashboard/blogs/edit/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  content: string;
  category: string;
  // file ইনপুট: optional, কারণ হয়তো তুমি সব সময় ছবিতে কিছু আপডেট দাও না
  image?: FileList;
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      category: '',
      image: undefined,
    }
  });

  // ডেটা লোড করা
  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        reset({
          title: data.title,
          content: data.content,
          category: data.category,
          // image ফাইল ডেটা আমরা এখানে না পাঠাবো (file input ডান্স হিসেবে থাকে)
        });
      })
      .catch(err => {
        console.error('Error fetching blog:', err);
      });
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      // FormData বানাও (multipart/form-data)
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('category', data.category);

      // যদি image ফাইল দেওয়া থাকে, তখন append করো
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]); // প্রথম ফাইল
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
        method: 'PUT',
        body: formData,
        // Content-Type header explicitly দেওয়া যাবে না — browser নিজেই boundary সহ সেট করবে
      });

      if (res.ok) {
        router.push('/dashboard/blogs');
      } else {
        console.error('Failed to update blog, response not ok');
      }
    } catch (error) {
      console.error('Failed to update blog post', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium">Content</label>
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            className="w-full p-2 border rounded"
            rows={6}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium">Category</label>
          <input
            id="category"
            type="text"
            {...register('category', { required: 'Category is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Image File Input */}
        <div>
          <label htmlFor="image" className="block font-medium">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full p-1 border rounded"
          />
          {errors.image && <p className="text-red-500 text-sm">Image is invalid</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
