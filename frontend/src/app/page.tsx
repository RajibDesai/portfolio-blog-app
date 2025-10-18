// "use client"; // যেহেতু skill bar ইত্যাদি হোক ইন্টার‌্যাক্টিভ, client component হিসেবে।

// import Image from 'next/image';
// import download from 'downloadjs';
// import { FaGithub } from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";

// export default function HomePage() {
//   const handleDownload = () => {
//     // Replace '/resume.pdf' with your actual resume URL
//     fetch('/resume.pdf').then(async (res) => {
//       const blob = await res.blob();
//       download(blob, 'resume.pdf', res.headers.get('content-type') || 'application/pdf');
//     });
//   };

//    // ✅ প্রজেক্টের ডেটা এখানে রাখুন
//   const featuredProjects = [
//     {
//       id: 1,
//       title: 'Project A: E-commerce Site',
//       description: 'A modern e-commerce platform with cart and payment functionality.',
//       image: '/images/project-a.png', // public/images/project-a.png
//       tags: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
//       liveLink: 'https://personal-portfolio-seven-opal-36.vercel.app',
//       codeLink: 'https://github.com/RajibDesai/personal-portfolio',
//     },
//     {
//       id: 2,
//       title: 'Project B: Blog Platform',
//       description: 'A feature-rich blog where users can post and comment.',
//       image: '/images/project-c.png', // public/images/project-b.png
//       tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
//       liveLink: 'https://personal-portfolio-seven-opal-36.vercel.app', // আপনার লাইভ লিংক দিন
//       codeLink: 'https://github.com/RajibDesai/personal-portfolio', // আপনার গিটহাব লিংক দিন
//     },
//   ];

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-12">
//       {/* 1. Introduction */}
//       <section className="text-center space-y-4">
//        <div className="w-36 h-36 rounded-full overflow-hidden mx-auto">
//             <Image
//               src="/images/profile.jpg"
//               alt="Profile Picture"
//               width={150}
//               height={150}
//               className="object-cover"
//             />
//          </div>
//         <h1 className="text-4xl font-bold text-primary">Rajib Desai</h1>
//         <p className="max-w-md mx-auto font-bold">
//           Hi, I’m a frontend developer building modern web experiences using Next.js, Tailwind CSS, and TypeScript.
//         </p>
//       </section>

//       {/* 2. Skills */}
//       <section className="w-full max-w-xl space-y-4">
//         <h2 className="text-2xl font-semibold text-secondary text-center">Skills</h2>
//         <div className="space-y-2">
//           {[
//             { name: 'Next.js', percent: 90 },
//             { name: 'React', percent: 85 },
//             { name: 'TypeScript', percent: 80 },
//             { name: 'Tailwind CSS', percent: 75 },
//           ].map((skill) => (
//             <div key={skill.name}>
//               <div className="flex justify-between">
//                 <span>{skill.name}</span>
//                 <span>{skill.percent}%</span>
//               </div>
//               <div className="w-full h-2 bg-neutral rounded">
//                 <div
//                   className="h-full bg-accent rounded"
//                   style={{ width: `${skill.percent}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//        {/* 3. Featured Projects */}
//       <section className="w-full max-w-5xl space-y-8">
//         <h2 className="text-2xl font-semibold text-secondary text-center">Featured Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {featuredProjects.map((proj) => (
//             <div
//               key={proj.id}
//               className="bg-custom-background border border-neutral/20 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col"
//             >
//               <Image
//                 src={proj.image}
//                 alt={`${proj.title} screenshot`}
//                 width={800}
//                 height={450}
//                 className="w-full h-48"
//               />
//               <div className="p-6 flex flex-col flex-grow">
//                 <div className="mb-4">
//                   {proj.tags.map(tag => (
//                     <span key={tag} className="inline-block bg-accent/20 text-accent-darker rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <h3 className="text-2xl font-bold text-primary mb-2 font-poppins">{proj.title}</h3>
//                 <p className="text-neutral flex-grow mb-4">{proj.description}</p>
//                 <div className="mt-auto flex items-center gap-4">
//                   <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
//                     <CgWebsite /> Live Demo
//                   </a>
//                   <a href={proj.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
//                     <FaGithub /> View Code
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* 4. Resume Download */}
//       <section>
//         <button
//           onClick={handleDownload}
//           className="px-6 py-3 bg-primary text-white rounded hover:bg-accent transition"
//         >
//           Download Resume
//         </button>
//       </section>
//     </main>
//   );
// }

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { IProject } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import AnimatedCard from "@/components/AnimatedCard";

// API থেকে ডেটা আনার ফাংশন
async function getFeaturedProjects(): Promise<IProject[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
      cache: 'no-store', // ডেভেলপমেন্টের জন্য cache বন্ধ রাখা ভালো
    });
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    const projects = await res.json();
    // এখানে আমরা প্রথম ৩টি প্রজেক্টকে ফিচারড হিসেবে দেখাব
    return projects.slice(0, 3);
  } catch (error) {
    console.error(error);
    return []; // এরর হলে খালি অ্যারে রিটার্ন করবে
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-16 py-2">
      {/* Hero Section */}
      <section className="text-center">
         <div className="w-36 h-36 rounded-full overflow-hidden mx-auto">
            <Image
              src="/images/profile.jpg"
              alt="Profile Picture"
              width={150}
              height={150}
              className="object-cover"
            />
         </div>
        <h1 className="text-4xl font-bold">Your Name</h1>
        <p className="mt-2 text-lg text-gray-600">
          A passionate Full Stack Developer creating modern and responsive web applications.
        </p>
        <a
          href="/resume.pdf" // public ফোল্ডারে আপনার resume.pdf ফাইলটি রাখুন
          download
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          Download Resume
        </a>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {['JavaScript/TypeScript', 'Next.js', 'React', 'Node.js/Express.Js', 'MongoDB', 'Tailwind CSS'].map(skill => (
            <span key={skill} className="bg-blue-400 text-gray-800 px-4 py-2 rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="text-center mt-8">
  <Link
    href="/projects"
    className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold"
  >
    View All Projects
    <ArrowRight size={20} />
  </Link>
    </div>
    </section>
          <div>
          <AnimatedCard />
          </div>
    </div>
  );
}
