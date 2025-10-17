// backend/src/middlewares/validateResource.ts
import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validateResource = (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // gelen ডেটা (body এবং file) একত্রিত করা হচ্ছে
      const incomingData = {
        ...req.body,
        file: req.file,
      };

      // schema.parse() ডেটা যাচাই করার পাশাপাশি transform-ও প্রয়োগ করে
      const parsed = schema.parse(incomingData);

      // ✨ উন্নতি: রূপান্তরিত ডেটাগুলোকে (যেমন technologies অ্যারে) আবার req.body-তে রাখা হচ্ছে।
      // এর ফলে কন্ট্রোলার সবসময় পরিষ্কার এবং রূপান্তরিত ডেটা পাবে।
      const { file, ...rest } = parsed as any;
      req.body = { ...req.body, ...rest };

      return next();

    } catch (error) {
      if (error instanceof ZodError) {
        // ✨ উন্নতি: এরর মেসেজের সাথে কোন ফিল্ডে ভুল হয়েছে তা (path) যোগ করা হচ্ছে।
        // এটি ফ্রন্টএন্ডে এরর দেখানোকে অনেক সহজ করে দেয়।
        const errors = error.issues.map((issue) => {
          return `${issue.path.join('.')} - ${issue.message}`;
        });

        return res.status(400).json({
          message: "Validation Error",
          errors,
        });
      }

      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

export default validateResource;
