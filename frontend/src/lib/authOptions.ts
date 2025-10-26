import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// authOptions অবজেক্টটি এখন এই ফাইল থেকে এক্সপোর্ট করা হচ্ছে
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  secret: process.env.AUTH_SECRET,
};