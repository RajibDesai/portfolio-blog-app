// frontend/src/types/index.ts
export interface IProject {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}