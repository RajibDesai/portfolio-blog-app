import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "", // এরর এড়ানোর জন্য ?? "" যোগ করা হয়েছে
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "", // এরর এড়ানোর জন্য ?? "" যোগ করা হয়েছে
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  // v4-এ production-এর জন্য secret কী জরুরি
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };