// export default {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {}, // <-- autoprefixer এখানে অবশ্যই থাকতে হবে
  },
};

// ২. এবার সেই ভ্যারিয়েবলটিকে default হিসেবে এক্সপোর্ট করা হলো
export default config;