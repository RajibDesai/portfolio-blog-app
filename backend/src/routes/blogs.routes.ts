// backend/src/routes/blogs.routes.ts
import { Router } from 'express';
import multer from "multer";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import validateResource from '../middlewares/validateResource.js';
import { blogSchema,updateBlogSchema } from '../validations/blog.validation.js';
import upload from '../middlewares/multer.middleware.js';


const router = Router();

const blogValidator = validateResource(blogSchema);
const updateBlogValidator = validateResource(updateBlogSchema);

router
  .route("/")
  .get(getBlogs)
  // এখানে upload.single('image') যোগ করা হয়েছে
  .post(upload.single("image"), blogValidator, createBlog);

router
  .route("/:id")
  .get(getBlogById)
  // এখানে upload.single('image') যোগ করা হয়েছে
  .put(upload.single("image"), updateBlogValidator, updateBlog)
  .delete(deleteBlog);

export default router;

// router.get('/', getBlogs);
// router.get('/:id', getBlogById);
// router.post('/',  blogValidator, createBlog);
// router.put('/:id',updateBlogValidator, updateBlog);
// router.delete('/:id', deleteBlog);

// export default router;