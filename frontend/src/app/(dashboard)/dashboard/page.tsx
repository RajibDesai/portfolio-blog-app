// frontend/src/app/(dashboard)/dashboard/page.tsx
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-8">Welcome to your dashboard. From here, you can manage your projects, blogs, and messages.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/projects" className="p-6 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
          <h2 className="text-xl font-semibold">Manage Projects</h2>
        </Link>
        <Link href="/dashboard/blogs" className="p-6 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors">
          <h2 className="text-xl font-semibold">Manage Blogs</h2>
        </Link>
        <Link href="/dashboard/messages" className="p-6 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors">
          <h2 className="text-xl font-semibold">View Messages</h2>
        </Link>
      </div>
    </div>
  );
}