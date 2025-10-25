import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// authOptions অবজেক্টটি এখানেই থাকবে, কিন্তু আর export করা হবে না
const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  secret: process.env.AUTH_SECRET,
};

// NextAuth handler তৈরি করা হচ্ছে authOptions ব্যবহার করে
const handler = NextAuth(authOptions);

// শুধুমাত্র GET এবং POST handler এক্সপোর্ট করা হচ্ছে, যা Next.js-এর নিয়ম
export { handler as GET, handler as POST };