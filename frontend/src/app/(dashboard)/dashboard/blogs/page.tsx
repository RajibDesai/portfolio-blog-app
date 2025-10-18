'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IBlog } from '@/types';

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
          method: 'DELETE',
        });
        setBlogs(blogs.filter(b => b._id !== id));
      } catch (error) {
        console.error("Failed to delete blog", error);
      }
    }
  };

  if (loading) return <div>Loading blog posts...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>
      <Link href="/dashboard/blogs/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Post
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td className="py-2 px-4 border-b">{blog.title}</td>
                <td className="py-2 px-4 border-b">{blog.category}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Link href={`/dashboard/blogs/edit/${blog._id}`} className="text-yellow-500">Edit</Link>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}