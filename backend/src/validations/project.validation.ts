// import { z } from "zod";

// // File schema
// const fileSchema = z
//   .object({
//     mimetype: z
//       .string()
//       .refine(
//         (type) => ["image/jpeg", "image/png","image/jpg"].includes(type),
//         "Only .jpg and .png .jpg formats are allowed"
//       ),
//     size: z
//       .number()
//       .max(2 * 1024 * 1024, "File size must be less than 2MB"),
//   })
//   .strict();

// // String → Array transform for technologies
// const technologiesSchema = z
//   .union([
//     z.string().transform((val, ctx) => {
//       try {
//         const arr = JSON.parse(val);
//         if (!Array.isArray(arr)) {
//           ctx.addIssue({
//             code: "custom",
//             message: "Technologies must be a JSON array",
//           });
//           return z.NEVER;
//         }
//         return arr;
//       } catch {
//         ctx.addIssue({
//           code: "custom",
//           message: "Technologies must be valid JSON",
//         });
//         return z.NEVER;
//       }
//     }),
//     z.array(z.string()),
//   ])
//   .transform((val) => (Array.isArray(val) ? val : []))
//   .refine((arr) => arr.length > 0, "At least one technology is required");

// export const projectSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   description: z
//     .string()
//     .min(10, "Description must be at least 10 characters long"),
//   liveLink: z.url("Live link must be a valid URL"),
//   githubLink: z.url("GitHub link must be a valid URL"),
//   technologies: technologiesSchema,
//   file: fileSchema.optional(),
// });

// export const updateProjectSchema = projectSchema.partial();


// backend/src/validations/project.validation.ts

import { z } from "zod";

export const technologiesSchema = z
  .union([
    z.array(z.string().min(1)),
    z.string().transform((val, ctx) => {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
          return parsed;
        }
      } catch {}
      const csv = val.split(",").map((s) => s.trim()).filter(Boolean);
      if (csv.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Technologies must be a non-empty array or comma-separated string",
        });
        return z.NEVER;
      }
      return csv;
    }),
  ])
  .transform((v) => (Array.isArray(v) ? v : v))
  .refine((arr) => arr.length > 0, "At least one technology is required");

// মূল প্রজেক্ট স্কিমা
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  liveLink: z.url("Live link must be a valid URL"),
  githubLink: z.url("GitHub link must be a valid URL"),
  technologies: technologiesSchema,
  //  উন্নতি: ফাইলকে এখানে একটি আবশ্যক ফিল্ড হিসেবে যোগ করা হলো
  file: z.any().refine((file) => !!file, "Image file is required."),
});

export const updateProjectSchema = projectSchema.partial();
