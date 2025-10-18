import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthActions from './AuthActions'; // নতুন কম্পোনেন্ট ইম্পোর্ট করুন

export default async function Navbar() {
  // v4-এ সার্ভার কম্পোনেন্টে সেশন আনার সঠিক উপায়
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">MyPortfolio</Link>
        <div className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        </div>
        <div>
          {/* AuthActions কম্পোনেন্টকে session prop পাস করা হচ্ছে */}
          <AuthActions session={session} />
        </div>
      </div>
    </nav>
  );
}