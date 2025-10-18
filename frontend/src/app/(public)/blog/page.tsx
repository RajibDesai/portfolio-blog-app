// frontend/src/app/(public)/blog/page.tsx
import BlogCard from '@/components/BlogCard'; // এটি আপনাকে তৈরি করতে হবে
import { IBlog } from '@/types';

async function getAllBlogs(): Promise<IBlog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">My Blog</h1>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs posted yet.</p>
      )}
    </div>
  );
}