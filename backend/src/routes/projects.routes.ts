// backend/src/routes/projects.routes.ts
import { Router } from "express";
import multer from "multer";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import validateResource from "../middlewares/validateResource.js";
import {
  projectSchema,
  updateProjectSchema,
} from "../validations/project.validation.js";
import upload from '../middlewares/multer.middleware.js';


const projectValidator = validateResource(projectSchema);
const updateProjectValidator = validateResource(updateProjectSchema);

const router = Router();

// '/' পাথের জন্য রাউট
router
  .route("/")
  .get(getProjects)
  .post(
    upload.single("image"), // প্রথমে ফাইল আপলোড মিডলওয়্যার চলবে
    projectValidator, // তারপর Zod ভ্যালিডেশন মিডলওয়্যার চলবে
    createProject // সবশেষে কন্ট্রোলার ফাংশন চলবে
  );

// '/:id' পাথের জন্য রাউট
router
  .route("/:id")
  .get(getProjectById)
  .put(
    upload.single("image"),
    updateProjectValidator,
    updateProject
  )
  .delete(deleteProject);

export default router;
