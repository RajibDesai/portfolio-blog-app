// frontend/src/app/(public)/blog/[id]/page.tsx
import { IBlog } from '@/types';
import Image from 'next/image';

async function getBlogDetails(id: string): Promise<IBlog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch blog details:', error);
    return null;
  }
}

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900">
        {blog.title}
      </h1>

      {/* Meta Information */}
      <div className="text-gray-500 mb-6">
        <span>
          Published on{' '}
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="mx-2">•</span>
        <span className="font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {blog.category}
        </span>
      </div>

      {/* Blog Image */}
      <div className="relative w-full h-64 md:h-96 mb-8">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
        <p>{typeof blog.content === 'string' ? blog.content : 'Content not available.'}</p>
      </div>
    </div>
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
