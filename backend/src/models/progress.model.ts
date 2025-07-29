// src/models/progress.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IProgress extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  progressPercentage: number;
}

const progressSchema = new Schema<IProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one progress document per course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

const Progress = model<IProgress>("Progress", progressSchema);
export default Progress;
