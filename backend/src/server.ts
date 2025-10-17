// backend/src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer'; // <-- multer import দরকার
import connectDB from './config/db.js';
import projectRoutes from './routes/projects.routes.js';
import blogRoutes from './routes/blogs.routes.js';
import messageRoutes from './routes/messages.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('API is running...');
});

// ✅ Global Error Handler (must be after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Multer specific errors (e.g. file size, invalid fieldname)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  // Custom mimetype error from validation
  if (err.message && err.message.includes("Only .jpg and .png")) {
    return res.status(400).json({ message: err.message });
  }

  // Fallback
  console.error("Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
