import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/types';

export default function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Link href={`/blog/${blog._id}`}>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
          <p className="text-sm text-gray-500">{blog.category}</p>
        </div>
      </Link>
    </div>
  );
}