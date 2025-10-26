// frontend/src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

// শুধুমাত্র GET এবং POST handler এক্সপোর্ট করা হচ্ছে, যা Next.js-এর নিয়ম
export { handler as GET, handler as POST };