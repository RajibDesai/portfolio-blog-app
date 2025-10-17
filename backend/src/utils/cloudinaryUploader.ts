import cloudinary from '../config/cloudinary.js';
import fs from "fs/promises";

/**
 * Cloudinary-তে একটি ফাইল আপলোড করে এবং সার্ভার থেকে অস্থায়ী ফাইলটি ডিলিট করে দেয়।
 * @param filePath - আপলোড করার জন্য ফাইলের পাথ
 * @param folder - Cloudinary-তে যে ফোল্ডারে ছবিটি সেভ হবে
 * @returns আপলোড করা ছবির নিরাপদ URL
 */
export const uploadImageToCloudinary = async (filePath: string, folder: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    // আপলোডের পর অস্থায়ী ফাইলটি মুছে ফেলা হচ্ছে
    await fs.unlink(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    // যদি আপলোড ব্যর্থ হয়, তবুও অস্থায়ী ফাইলটি মুছে ফেলার চেষ্টা করা হবে
    try {
      await fs.unlink(filePath);
    } catch (unlinkError) {
      console.error("Failed to delete temp file after failed upload:", unlinkError);
    }
    throw new Error("Image could not be uploaded.");
  }
};