// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import Blog from '../models/Blog.js';
import { uploadImageToCloudinary } from '../utils/cloudinaryUploader.js';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;

    const imageUrl = await uploadImageToCloudinary(req.file!.path, "portfolio_blogs");

    const blog = new Blog({ title, content, category, imageUrl });
    const newBlog = await blog.save();

    return res.status(201).json(newBlog);

  } catch (error) {
    console.error("Error creating blog:", error);
    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server Error creating blog" });
  }
};

// Update an existing blog with optional image upload

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const updateData: any = { title, content, category };

    // যদি নতুন কোনো ছবি আপলোড করা হয়, তবেই শুধু হেলপার কল করা হবে
    if (req.file) {
      updateData.imageUrl = await uploadImageToCloudinary(req.file.path, "portfolio_blogs");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    return res.json(updatedBlog);

  } catch (error) {
    console.error("Error updating blog:", error);
    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server Error updating blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};