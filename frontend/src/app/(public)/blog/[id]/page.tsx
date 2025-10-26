// frontend/src/app/(public)/blog/[id]/page.tsx
import { IBlog } from '@/types';
import Image from 'next/image';

// 🧠 পেজটি প্রতি ৬০ সেকেন্ড পর রিভ্যালিডেট হবে
export const revalidate = 60;

/**
 * 🔹 Generate static params (SSG)
 * Build-time এ কিছু ব্লগ পেজ প্রি-রেন্ডার করে দেয় SEO এর জন্য।
 * নতুন ব্লগ এলে runtime এ ISR দ্বারা নতুন পেজ তৈরি হয়।
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs for static params');
      return [];
    }

    const blogs: IBlog[] = await res.json();

    // প্রতিটি ব্লগের ID দিয়ে static path তৈরি করা হচ্ছে
    return blogs.map(blog => ({
      id: blog._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * 🔹 Fetch a single blog with ISR caching
 */
async function getBlogDetails(id: string): Promise<IBlog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch blog details:', error);
    return null;
  }
}

/**
 * 🔹 Blog Details Page (ISR + SSG Hybrid)
 */
export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Next.js 15 এ params এখন Promise
  const blog = await getBlogDetails(id);

  if (!blog) {
    return (
      <div className="text-center text-red-500">
        Blog post not found or failed to load.
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="text-gray-500 mb-6">
        <time>
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="mx-2">•</span>
        <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {blog.category}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full h-64 md:h-96 mb-8">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
        {typeof blog.content === 'string' ? (
          <p>{blog.content}</p>
        ) : (
          <p>Content not available.</p>
        )}
      </div>
    </article>
  );
}

// import { IBlog } from '@/types';
// import Image from 'next/image';

// async function getBlogDetails(id: string): Promise<IBlog | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     console.error('Failed to fetch blog details:', error);
//     return null;
//   }
// }

// export default async function BlogDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params; // ✅ Next.js 15 এ params এখন Promise
//   const blog = await getBlogDetails(id);

//   if (!blog) {
//     return (
//       <div className="text-center text-red-500">
//         Blog post not found or failed to load.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Blog Title */}
//       <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900">
//         {blog.title}
//       </h1>

//       {/* Meta Information */}
//       <div className="text-gray-500 mb-6">
//         <span>
//           Published on{' '}
//           {new Date(blog.createdAt).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </span>
//         <span className="mx-2">•</span>
//         <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//           {blog.category}
//         </span>
//       </div>

//       {/* Blog Image */}
//       <div className="relative w-full h-64 md:h-96 mb-8">
//         <Image
//           src={blog.imageUrl}
//           alt={blog.title}
//           fill
//           style={{ objectFit: 'cover' }}
//           className="rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Blog Content */}
//       <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
//         <p>{typeof blog.content === 'string' ? blog.content : 'Content not available.'}</p>
//       </div>
//     </div>
//   );
// }
