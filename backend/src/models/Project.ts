// backend/src/models/Project.ts
import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
}

const projectSchema:Schema = new Schema<IProject>(
  {
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    imageUrl: { type: String, required: true }, // Cloudinary থেকে আসবে
    liveLink: { type: String, required: true },
    githubLink: { type: String, required: true },
    technologies: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Project = model<IProject>("Project", projectSchema);
export default Project;
