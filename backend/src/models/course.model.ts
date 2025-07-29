// src/models/course.model.ts
import { Schema, model, Document } from "mongoose";

// Interface for a single Multiple-Choice Option
export interface IOption extends Document {
  text: string;
}

// Interface for a single Question
export interface IQuestion extends Document {
  text: string;
  options: IOption[];
  correctAnswer: number; // Index of the correct option
}

// Interface for a single Quiz
export interface IQuiz extends Document {
  title: string;
  questions: IQuestion[];
}

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
  quizzes: IQuiz[]; // Array of quizzes (if needed in the future)
}

const optionSchema = new Schema<IOption>({
  text: { type: String, required: true },
});

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [optionSchema],
  correctAnswer: { type: Number, required: true },
});

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  questions: [questionSchema],
});

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
    quizzes: [quizSchema], // Embed quizzes directly in the course document
    // You can add more fields like reviews, ratings, etc.
  },
  { timestamps: true }
);

const Course = model<ICourse>("Course", courseSchema);
export default Course;
