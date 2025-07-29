// src/models/course.model.ts
import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  price: number;
}

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
    // lessons and quizzes here later
  },
  { timestamps: true }
);

const Course = model<ICourse>("Course", courseSchema);
export default Course;
