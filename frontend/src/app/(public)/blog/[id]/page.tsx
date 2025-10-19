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

// export default async function BlogDetailsPage({ params }: { params: { id: string } }) {
//   const blog = await getBlogDetails(params.id);

//   if (!blog) {
//     return <div className="text-center text-red-500">Blog post not found or failed to load.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Blog Title */}
//       <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900">{blog.title}</h1>

//       {/* Meta Information */}
//       <div className="text-gray-500 mb-6">
//         <span>Published on {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
//         <span className="mx-2">•</span>
//         <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{blog.category}</span>
//       </div>

//       {/* Blog Image */}
//       <div className="relative w-full h-64 md:h-96 mb-8">
//         <Image
//           src={blog.imageUrl}
//           alt={blog.title}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Blog Content */}
//       <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
//         {/* React can't render objects directly, ensure blog.content is a string */}
//         <p>{typeof blog.content === 'string' ? blog.content : 'Content is not available.'}</p>
//       </div>
//     </div>
//   );
// }

// import { IBlog } from '@/types';
// import Image from 'next/image';

// // props-এর জন্য একটি সুনির্দিষ্ট টাইপ তৈরি করা হলো
// type Props = {
//   params: { id: string };
// };

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

// // এখন কম্পোনেন্টটি Props টাইপটি ব্যবহার করছে
// export default async function BlogDetailsPage({ params }: Props) {
//   const blog = await getBlogDetails(params.id);

//   if (!blog) {
//     return <div className="text-center text-red-500">Blog post not found or failed to load.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl md:text-5xl font-bold mb-3">{blog.title}</h1>
//       <div className="text-gray-500 mb-6">
//         <span>Published on {new Date(blog.createdAt).toLocaleDateString()}</span>
//         <span className="mx-2">•</span>
//         <span className="font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">{blog.category}</span>
//       </div>
//       <div className="relative w-full h-64 md:h-96 mb-8">
//         <Image
//           src={blog.imageUrl}
//           alt={blog.title}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg shadow-lg"
//         />
//       </div>
//       <div className="prose lg:prose-xl max-w-none text-neutral leading-relaxed">
//         <p>{blog.content}</p>
//       </div>
//     </div>
//   );
// }

import { IBlog } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation'; // ✅ notFound ইম্পোর্ট করা হলো

// ✅ ডাইনামিক রেন্ডারিং নিশ্চিত করা হয়েছে: এটি বিল্ড টাইম টাইপিং এরর এড়াতে সাহায্য করে
export const dynamic = 'force-dynamic';

// Props-এর জন্য একটি সুনির্দিষ্ট টাইপ তৈরি করা হলো
type Props = {
  params: {
    id: string
  };
};

/**
 * API থেকে একটি নির্দিষ্ট ব্লগের বিস্তারিত তথ্য নিয়ে আসে।
 * @param id - ব্লগের ID।
 * @returns IBlog অথবা null।
 */
async function getBlogDetails(id: string): Promise<IBlog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
      cache: 'no-store',
    });

    // 404 বা অন্য কোনো ব্যর্থ রেসপন্স হলে null রিটার্ন
    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error('Failed to fetch blog details:', error);
    return null;
  }
}

// এখন কম্পোনেন্টটি Props টাইপটি ব্যবহার করছে
export default async function BlogDetailsPage({ params }: Props) {
  // ডাইনামিক রুট প্যারামিটার অ্যাক্সেস
  const { id } = params;

  const blog = await getBlogDetails(id);

  if (!blog) {
    // ✅ notFound() ব্যবহার করে একটি সঠিক 404 পেজ প্রদর্শন
    notFound();
  }

  // ডেট ফর্ম্যাটিং সহজ করার জন্য
  const formattedDate = new Date(blog.createdAt as string).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900">{blog.title}</h1>

      {/* মেটা ডেটা */}
      <div className="text-gray-500 mb-6 flex items-center flex-wrap">
        <span>Published on {formattedDate}</span>
        <span className="mx-3">•</span>
        <span className="font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm shadow-sm">
          {blog.category}
        </span>
      </div>

      {/* ইমেজ সেকশন */}
      <div className="relative w-full h-64 md:h-96 mb-10 overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          // ✅ layout="fill" এবং objectFit="cover" এর পরিবর্তে আধুনিক props
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg shadow-xl"
          priority // দ্রুত লোডের জন্য
        />
      </div>

      {/* কনটেন্ট সেকশন */}
      {/* whitespace-pre-line ব্যবহার করা হলো যাতে ডাটাবেজ থেকে আসা লাইন ব্রেকগুলো বজায় থাকে */}
      <div className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        <p>{blog.content}</p>
      </div>

    </div>
  );
}