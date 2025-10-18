import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    // এই 콜백টি নির্ধারণ করে ব্যবহারকারী সুরক্ষিত পেজ অ্যাক্সেস করতে পারবে কি না
    authorized: ({ token }) => !!token,
  },
  pages: {
    // যদি authorized 콜백 false রিটার্ন করে, ব্যবহারকারীকে এই পেজে পাঠানো হবে
    signIn: "/dashboard/login",
  },
});

// এই matcher নির্ধারণ করে কোন কোন রুটে উপরের middleware কাজ করবে
export const config = {
  matcher: ["/dashboard/:path*"], // /dashboard এবং এর ভেতরের সব রুট
};