import multer from "multer";

// Multer-এর সম্পূর্ণ এবং কেন্দ্রীয় কনফিগারেশন
const upload = multer({
  // ১. dest: ফাইল অস্থায়ীভাবে কোথায় সেভ হবে
  dest: "uploads/",

  // ২. limits: ফাইলের উপর সীমাবদ্ধতা আরোপ করা
  limits: {
    fileSize: 2 * 1024 * 1024, // ফাইলের সর্বোচ্চ সাইজ ২ মেগাবাইট
  },

  // ৩. fileFilter: কোন ধরনের ফাইল গ্রহণ করা হবে তা নির্ধারণ করা
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      // যদি ফাইলের ধরন সঠিক হয়, তবে ফাইলটি গ্রহণ করো
      cb(null, true);
    } else {
      // যদি ফাইলের ধরন ভুল হয়, তবে একটি এররসহ ফাইলটি প্রত্যাখ্যান করো
      cb(new Error("Only .jpg, .jpeg and .png formats are allowed!"));
    }
  },
});

export default upload;