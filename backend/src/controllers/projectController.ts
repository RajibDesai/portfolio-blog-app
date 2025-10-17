// backend/src/controllers/projectController.ts
import e, { Request, Response } from 'express';
import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';
import fs from "fs/promises";

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project with image upload
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, liveLink, githubLink, technologies } = req.body;

    // উন্নতি: একটি অতিরিক্ত নিরাপত্তা চেক।
    // যদিও validateResource মিডলওয়্যার ফাইল চেক করে, এই guard clause কোডটিকে আরও নিরাপদ করে।
    // যদি কোনো কারণে মিডলওয়্যার ছাড়া এই কন্ট্রোলার কল হয়, অ্যাপ্লিকেশন ক্র্যাশ করবে না।
    // if (!req.file) {
    //   return res.status(400).json({ message: "Image file is required." });
    // }

    // Cloudinary-তে ইমেজ আপলোড হচ্ছে
    const result = await cloudinary.uploader.upload(req.file!.path, {
      folder: "portfolio_blogs",
    });

    const imageUrl = result.secure_url;
    await fs.unlink(req.file!.path);

    const project = new Project({ title, description, liveLink, githubLink, technologies, imageUrl });
    const newProject = await project.save();

    return res.status(201).json(newProject);

  } catch (error:any) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: error.message || "Server Error creating project" });
  }

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "portfolio_projects",
    //   });
    //   imageUrl = result.secure_url;

    //   // Clean up local temp file
    //   try {
    //     await fs.unlink(req.file.path);
    //   } catch (err) {
    //     console.warn("Failed to delete temp file:", err);
    //   }
    // } else {
    //   return res.status(400).json({ message: "Image file is required" });
    // }

  //   const project = new Project({
  //     title,
  //     description,
  //     imageUrl,
  //     liveLink,
  //     githubLink,
  //     technologies, // already normalized by Zod middleware
  //   });

  //   const createdProject = await project.save();
  //   return res.status(201).json(createdProject);
  // } catch (error) {
  //   console.error("Error creating project:", error);
  //   return res.status(500).json({ message: "Server Error creating project" });
  // }
};

// export const createProject = async (req: Request, res: Response) => {
//   const { title, description, liveLink, githubLink, technologies } = req.body;

//   try {
//     let imageUrl = '';
//     // req.file আসছে multer থেকে
//     if (req.file) {
//       // Cloudinary-তে ইমেজ আপলোড হচ্ছে
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'portfolio_projects', // Cloudinary-তে একটি ফোল্ডারের নাম
//       });
//       imageUrl = result.secure_url;
//     }

//     const project = new Project({
//       title,
//       description,
//       imageUrl, // Cloudinary থেকে পাওয়া URL
//       liveLink,
//       githubLink,
//       technologies
//     });

//     const createdProject = await project.save();
//     res.status(201).json(createdProject);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error creating project' });
//   }
// };

// Update an existing project with optional image upload

export const updateProject = async (req: Request, res: Response) => {
  const { title, description, liveLink, githubLink, technologies } = req.body;
  const updateData: any = { title, description, liveLink, githubLink, technologies };

  try {
    // যদি নতুন কোনো ফাইল আপলোড করা হয়
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio_projects',
      });
      updateData.imageUrl = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};