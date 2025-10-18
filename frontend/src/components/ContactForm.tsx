// frontend/src/components/ContactForm.ts
'use client';

import { useState, useEffect } from 'react'; // useEffect ইম্পোর্ট করুন
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>();

  const [status, setStatus] = useState<{ type: 'success' | 'failed'; message: string } | null>(null);

  // ✨ উন্নতি: useEffect ব্যবহার করে স্ট্যাটাস মেসেজ অটো-হাইড করা
  useEffect(() => {
    // যখনই status পরিবর্তন হবে, এই কোডটি চলবে
    if (status?.type === 'success') {
      // যদি সফলতার মেসেজ থাকে, একটি টাইমার সেট করা হবে
      const timer = setTimeout(() => {
        setStatus(null); // ৩ সেকেন্ড পর স্ট্যাটাস মুছে ফেলা হবে
      }, 5000); // ৩০০০ মিলিসেকেন্ড = ৩ সেকেন্ড

      // cleanup function: কম্পোনেন্টটি আনমাউন্ট হলে বা status আবার পরিবর্তন হলে টাইমারটি পরিষ্কার করা হবে
      return () => clearTimeout(timer);
    }
  }, [status]); // এই useEffect শুধুমাত্র status পরিবর্তন হলেই চলবে

  const onSubmit = async (data: FormValues) => {
    setStatus(null);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`, data);

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      reset();

    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || 'Failed to send message!';
      console.log("Error message:", errorMessage);
      setStatus({ type: 'failed', message: errorMessage });
      console.error(error);
    }
  };

  return (
    <div>
      {status && (
        <div className={`text-center mt-4 p-3 rounded-md ${
          status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral">Message</label>
        <textarea
          id="message"
          rows={4}
          {...register('message', { required: 'Message cannot be empty' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useForm } from 'react-hook-form';

// // ফর্মের ডেটাগুলোর জন্য একটি টাইপ তৈরি করা হলো
// type FormValues = {
//   name: string;
//   email: string;
//   message: string;
// };

// export default function ContactForm() {
//   // useForm হুক ব্যবহার করে ফর্মের স্টেট ম্যানেজ করা হচ্ছে
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset // ফর্ম রিসেট করার জন্য
//   } = useForm<FormValues>();

//   // সাবমিশনের স্ট্যাটাস (সফল/ব্যর্থ) দেখানোর জন্য state
//   const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

//   // react-hook-form দ্বারা কল করা হবে এই ফাংশনটি
//   const onSubmit = async (data: FormValues) => {
//     setStatus(null); // পুরনো স্ট্যাটাস মুছে ফেলা হচ্ছে

//     try {
//       // axios ব্যবহার করে API-তে POST রিকোয়েস্ট পাঠানো হচ্ছে
//       await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`, data);

//       setStatus({ type: 'success', message: 'Message sent successfully!' });
//       reset(); // সফলভাবে পাঠানোর পর فرم খালি করা হচ্ছে

//     } catch (error) {
//       const err = error as AxiosError<{ message?: string }>;
//       const errorMessage = err.response?.data?.message || 'Failed to send message. Please try again.';
//       setStatus({ type: 'error', message: errorMessage });
//       console.error(error);
//     }
//   };

//   return (
//     // handleSubmit ফাংশনটি আপনার onSubmit ফাংশনকে কল করবে
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {/* Name Field */}
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-neutral">Name</label>
//         <input
//           type="text"
//           id="name"
//           // register ফাংশনটি input-কে فرمের সাথে যুক্ত করে
//           {...register('name', { required: 'Name is required' })}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//         />
//         {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//       </div>

//       {/* Email Field */}
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-neutral">Email</label>
//         <input
//           type="email"
//           id="email"
//           {...register('email', {
//             required: 'Email is required',
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           })}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//         />
//         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//       </div>

//       {/* Message Field */}
//       <div>
//         <label htmlFor="message" className="block text-sm font-medium text-neutral">Message</label>
//         <textarea
//           id="message"
//           rows={4}
//           {...register('message', { required: 'Message cannot be empty' })}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//         ></textarea>
//         {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting} // সাবমিট চলাকালীন বাটন ডিজেবল থাকবে
//         className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//       >
//         {isSubmitting ? 'Sending...' : 'Send Message'}
//       </button>

//       {/* উন্নত স্ট্যাটাস মেসেজ */}
//       {status && (
//         <div className={`text-center mt-4 p-3 rounded-md ${
//           status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {status.message}
//         </div>
//       )}
//     </form>
//   );
// }

// 'use client';

// import { useState, FormEvent } from 'react';

// export default function ContactForm() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setStatus('Sending...');

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, message }),
//       });

//       if (res.ok) {
//         setStatus('Message sent successfully!');
//         setName('');
//         setEmail('');
//         setMessage('');
//       } else {
//         setStatus('Failed to send message.');
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus('An error occurred.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
//         <textarea
//           id="message"
//           rows={4}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         ></textarea>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Send Message
//       </button>
//       {status && <p className="text-center mt-4">{status}</p>}
//     </form>
//   );
// }