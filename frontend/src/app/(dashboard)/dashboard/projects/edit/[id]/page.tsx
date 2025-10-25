// frontend/src/app/(dashboard)/dashboard/projects/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams , useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// فرمের ডেটাগুলোর জন্য একটি টাইপ তৈরি করা হলো
type FormValues = {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  technologies: string;
  image?: FileList; // আপডেটের সময় ইমেজ ঐচ্ছিক হতে পারে, তাই '?' চিহ্ন দেওয়া হয়েছে
};

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;
  console.log("Project ID:", projectId);

  const router = useRouter();

  // react-hook-form থেকে প্রয়োজনীয় ফাংশনগুলো নেওয়া হচ্ছে
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset // فرمে ডিফল্ট ভ্যালু সেট করার জন্য
  } = useForm<FormValues>();

  // বর্তমান ছবিটি দেখানোর জন্য একটি state
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  // useEffect হুক ব্যবহার করে পেজ লোড হওয়ার সাথে সাথে নির্দিষ্ট প্রজেক্টের ডেটা আনা হচ্ছে
  useEffect(() => {
    // যদি URL থেকে id পাওয়া যায়, তবেই ডেটা fetch করা হবে
    if (projectId) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${projectId}`)
        .then(response => {
          const project = response.data;
          // fetched ডেটা দিয়ে ফর্মের ফিল্ডগুলো পূরণ করা হচ্ছে
          reset({
            title: project.title,
            description: project.description,
            liveLink: project.liveLink,
            githubLink: project.githubLink,
            // technologies অ্যারে-কে কমা-যুক্ত স্ট্রিং-এ রূপান্তর করা হচ্ছে
            technologies: project.technologies.join(', '),
          });
          // বর্তমান ছবির URL state-এ সেভ করা হচ্ছে
          setCurrentImageUrl(project.imageUrl);
        })
        .catch(error => {
          console.error('Failed to fetch project data:', error);
          alert('Could not load project data.');
        });
    }
  }, [projectId, reset]); // id বা reset ফাংশন পরিবর্তন হলে এই ইফেক্টটি আবার চলবে

  // فرم সাবমিট করার জন্য হ্যান্ডলার ফাংশন
  const onSubmit = async (data: FormValues) => {
    // ফাইলসহ ডেটা পাঠানোর জন্য FormData অবজেক্ট তৈরি করা হচ্ছে
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('liveLink', data.liveLink);
    formData.append('githubLink', data.githubLink);
    // technologies স্ট্রিং-কে অ্যারে তে রূপান্তর করা হচ্ছে
    const technologiesArray = data.technologies.split(',').map(t => t.trim());
    formData.append('technologies', JSON.stringify(technologiesArray));

    // যদি ব্যবহারকারী নতুন কোনো ছবি আপলোড করে, তবেই শুধু সেটিকে FormData-তে যোগ করা হবে
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      // axios.put ব্যবহার করে ব্যাকএন্ড API-তে PUT রিকোয়েস্ট পাঠানো হচ্ছে
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${projectId}`, formData);
      router.push('/dashboard/projects'); // সফলভাবে আপডেট হলে প্রজেক্ট লিস্ট পেজে রিডাইরেক্ট করা
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || 'Update failed');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full md:max-w-9/12 bg-white p-6 rounded-lg shadow-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Project</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input id="title" type="text" {...register('title')} className="w-full p-2 border rounded" required />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea id="description" {...register('description')} className="w-full p-2 border rounded" rows={4} required />
          </div>

          {/* Image Field */}
          <div>
            <label htmlFor="image" className="block font-medium">Change Project Image (Optional)</label>
            {/* বর্তমান ছবিটি প্রিভিউ হিসেবে দেখানো হচ্ছে */}
            {currentImageUrl && (
              <Image
                src={currentImageUrl}
                alt="Current project"
                width={128}
                height={128}
                className="w-32 h-auto mt-2 rounded"
              />
             )}
            <input id="image" type="file" accept="image/*" {...register('image')} className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Live Link Field */}
          <div>
            <label htmlFor="liveLink" className="block font-medium">Live Link</label>
            <input id="liveLink" type="url" {...register('liveLink')} className="w-full p-2 border rounded" required />
          </div>

          {/* GitHub Link Field */}
          <div>
            <label htmlFor="githubLink" className="block font-medium">GitHub Link</label>
            <input id="githubLink" type="url" {...register('githubLink')} className="w-full p-2 border rounded" required />
          </div>

          {/* Technologies Field */}
          <div>
            <label htmlFor="technologies" className="block font-medium">Technologies</label>
            <input
              id="technologies"
              type="text"
              {...register('technologies')}
              className="w-full p-2 border rounded"
              placeholder="কমা দিয়ে আলাদা করুন (e.g., React, Next.js)"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
