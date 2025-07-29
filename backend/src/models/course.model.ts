// src/models/course.model.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for a single lesson
export interface ILesson extends Document {
  title: string;
  videoUrl: string;
  resources?: string[]; // Optional array of strings for links
}

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  price: number;
  lessons: ILesson[]; // Array of lessons
}

// Create a schema for the embedded lesson document
const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  resources: [{ type: String }],
});

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    lessons: [lessonSchema], // Embed lessons directly in the course document
    // quizzes here later
    // You can add more fields like reviews, ratings, etc.
  },
  { timestamps: true }
);

const Course = model<ICourse>("Course", courseSchema);
export default Course;
