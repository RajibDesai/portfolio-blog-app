// dashboard/messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; // axios এবং AxiosError ইম্পোর্ট করুন

interface IMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessageManagementPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // এরর স্টেট যোগ করা হলো

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // axios.get ব্যবহার করে ডেটা আনা হচ্ছে
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`);
        // axios-এর ক্ষেত্রে ডেটা response.data-এর ভেতরে থাকে
        setMessages(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data as { message: string })?.message || "Failed to fetch messages.";
        console.error("Failed to fetch messages:", errorMessage);
        setError(errorMessage); // এরর state আপডেট করা হচ্ছে
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []); // [] মানে এই ইফেক্টটি শুধু প্রথমবার পেজ লোড হওয়ার সময় চলবে

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>Loading messages...</div>;
  }

  if (error) {
    return <div className='min-h-screen flex justify-center items-center text-red-500'>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center text-primary font-bold mb-6">Contact Messages</h1>
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg._id} className="p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <p><strong>From:</strong> {msg.name} ({msg.email})</p>
                <p className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-neutral">{msg.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No messages found.</p>
      )}
    </div>
  );
}
