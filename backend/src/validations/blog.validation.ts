// backend/src/validations/blog.validation.ts
import { z } from "zod";

// ব্লগ তৈরি এবং আপডেটের জন্য চূড়ান্ত ভ্যালিডেশন স্কিমা
export const blogSchema = z.object({
  title: z
    .string()
    .min(3, { message: "শিরোনাম কমপক্ষে ৩ অক্ষরের হতে হবে" }),
  content: z
    .string()
    .min(20, { message: "ব্লগের বিষয়বস্তু কমপক্ষে ২০ অক্ষরের হতে হবে" }),
  category: z
    .string()
    .min(2, { message: "ক্যাটেগরি কমপক্ষে ২ অক্ষরের হতে হবে" }),

  // ✨ উন্নতি: ফাইলকে এখানে একটি আবশ্যক ফিল্ড হিসেবে যোগ করা হলো।
  // z.any() ব্যবহার করা হয়েছে কারণ আমরা শুধু এর অস্তিত্ব চেক করতে চাই।
  // আসল ফাইল টাইপ এবং সাইজ ভ্যালিডেশন multer করবে, কিন্তু Zod নিশ্চিত করবে যে ফাইলটি পাঠানো হয়েছে।
  file: z
    .any()
    .refine((file) => !!file, "ব্লগের ছবিটি আবশ্যক।"),
});

// আপডেটের জন্য, সব 필্ড ঐচ্ছিক থাকবে
export const updateBlogSchema = blogSchema.partial();