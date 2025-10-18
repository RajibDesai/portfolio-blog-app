// import { IProject } from '@/types';
// import Link from 'next/link';
// import Image from 'next/image';

// async function getProjectDetails(id: string): Promise<IProject | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
//   const project = await getProjectDetails(params.id);

//   if (!project) {
//     return <div className="text-center">Project not found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
//       <Image
//         src={project.imageUrl}
//         alt={project.title}
//         width={800}
//         height={450}
//         className="w-full object-cover rounded-lg mb-6"
//       />
//       <div className="prose lg:prose-xl max-w-none">
//         <p>{project.description}</p>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">Technologies Used:</h3>
//         <div className="flex flex-wrap gap-2">
//           {project.technologies.map(tech => (
//             <span key={tech} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{tech}</span>
//           ))}
//         </div>
//       </div>
//       <div className="mt-8 flex gap-4">
//         <Link href={project.liveLink} target="_blank" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           Live Demo
//         </Link>
//         <Link href={project.githubLink} target="_blank" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
//           GitHub Repo
//         </Link>
//       </div>
//     </div>
//   );
// }

// .....................................................................

// frontend/src/(public)/projects/[id]/page.tsx

import { IProject } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// ✅ নিশ্চিত সমাধান: এই কনফিগারেশনটি Next.js কে বলে দেয় যে
// এই পেজটি বিল্ড টাইমে স্ট্যাটিক্যালি রেন্ডার করা যাবে না।
// এটি ডাইনামিক প্যারামিটার ব্যবহারের ফলে আসা সতর্কতা দূর করে।
export const dynamic = 'force-dynamic';


/**
 * API থেকে প্রজেক্টের বিস্তারিত তথ্য নিয়ে আসে
 * @param id - প্রজেক্টের ID
 * @returns IProject অথবা null
 */
async function getProjectDetails(id: string): Promise<IProject | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
      // 'no-store' নিশ্চিত করে যে প্রতি রিকোয়েস্টে নতুন ডেটা ফেচ হবে।
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Error fetching project: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error in getProjectDetails:", error);
    return null;
  }
}

// Next.js সার্ভার কম্পোনেন্ট
export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {

  // ✅ ডিস্ট্রাকচারিং: params অবজেক্ট থেকে id ডিস্ট্রাকচার করা হয়েছে।
  // export const dynamic = 'force-dynamic' এর সাথে এটি সঠিকভাবে কাজ করবে।
  const { id } = params;

  const project = await getProjectDetails(id);

  if (!project) {
    // প্রজেক্ট না পাওয়া গেলে Next.js এর 404 পেজ দেখাবে
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 border-b pb-2">{project.title}</h1>

      {/* ইমেজ সেকশন */}
      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg mb-8 bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 hover:scale-[1.03]"
          priority // পেজ লোডের সময় দ্রুত লোড করার জন্য
        />
      </div>

      {/* বর্ণনা সেকশন */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Project Description</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.description}</p>
      </div>

      {/* টেকনোলজি সেকশন */}
      <div className="mt-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Technologies Used:</h3>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md transition hover:bg-indigo-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* লিঙ্ক সেকশন */}
      <div className="mt-10 pt-4 border-t flex flex-col sm:flex-row gap-4">
        <Link
          href={project.liveLink}
          target="_blank"
          className="flex-1 text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition duration-300"
        >
          🚀 Live Demo
        </Link>
        <Link
          href={project.githubLink}
          target="_blank"
          className="flex-1 text-center bg-gray-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-900 transition duration-300"
        >
          <svg className="inline w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.864 8.165 6.837 9.5.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.157-1.107-1.465-1.107-1.465-.908-.62.069-.608.069-.608 1.002.071 1.531 1.03 1.531 1.03.89 1.529 2.341 1.091 2.91.836.091-.647.349-1.091.634-1.342-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.029A9.57 9.57 0 0112 5.09c.84.004 1.684.113 2.493.336 1.91-1.3 2.75-1.029 2.75-1.029.544 1.378.201 2.397.098 2.65.639.701 1.029 1.594 1.029 2.685 0 3.833-2.335 4.688-4.566 4.935.359.307.68.919.68 1.851 0 1.342-.012 2.42-.012 2.744 0 .267.18.575.688.484C19.138 20.165 22 16.419 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
          GitHub Repo
        </Link>
      </div>
    </div>
  );
}

// import { IProject } from '@/types';

// // async function to fetch project details from the API
// async function getProjectDetails(id: string): Promise<IProject | null> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// // The page component for displaying project details
// export default async function ProjectDetailsPage({ params: { id } }: { params: { id: string } }) {
//   const project = await getProjectDetails(id); // Fetch project details using the id from params

//   if (!project) {
//     return <div className="text-center">Project not found.</div>;
//   }

  // return (
  //   <div className="max-w-4xl mx-auto px-4 py-8">
  //     <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
  //     {/* Use standard img tag instead of Next.js Image component */}
  //     <img
  //       src={project.imageUrl}
  //       alt={project.title}
  //       className="w-full h-auto object-cover rounded-lg mb-6 shadow-lg"
  //     />
  //     <div className="prose lg:prose-xl max-w-none mb-6">
  //       <p>{project.description}</p>
  //     </div>
  //     <div className="mb-8">
  //       <h3 className="text-2xl font-semibold mb-3">Technologies Used:</h3>
  //       <div className="flex flex-wrap gap-2">
  //         {project.technologies.map(tech => (
  //           <span key={tech} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
  //             {tech}
  //           </span>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="flex flex-wrap gap-4">
  //       {/* Use standard a tag instead of Next.js Link component */}
  //       <a
  //         href={project.liveLink}
  //         target="_blank"
  //         className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
  //       >
  //         Live Demo
  //       </a>
  //       <a
  //         href={project.githubLink}
  //         target="_blank"
  //         className="inline-block bg-neutral text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral/90 transition-colors"
  //       >
  //         GitHub Repo
  //       </a>
  //     </div>
  //   </div>
  // );
// }

