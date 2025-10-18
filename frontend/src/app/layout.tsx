import { Metadata } from "next";
import './globals.css';
import { Roboto, Poppins } from 'next/font/google';
import Navbar from "@/components/Navbar";

// ফন্ট কনফিগারেশন
const roboto = Roboto({
  weight: ['100','200','300','400','500','600','700','800','900'], // আপনার প্রয়োজনীয় ওয়েটগুলো এখানে যোগ করুন
  subsets: ['latin'],
  variable: '--font-roboto', // CSS ভ্যারিয়েবল হিসাবে সেট করুন
  display: 'swap',
});

const poppins = Poppins({
  weight: ['100','200','300','400','500','600','700','800','900'],
  subsets: ['latin'],
  variable: '--font-poppins', // CSS ভ্যারিয়েবল হিসাবে সেট করুন
  display: 'swap',
});

export const metadata: Metadata = {
  title: "My Portfolio & Blog",
  description: "A personal portfolio and blog website built with Next.js",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
         <Navbar />
         <main className="container mx-auto px-4 py-4">
           {children}
         </main>
         {/* <Footer /> */}
       </body>
    </html>
  );
}