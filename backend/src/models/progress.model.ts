// src/models/progress.model.ts
import { Schema, model, Document, Types } from "mongoose";

// Interface for a single quiz attempt
export interface IQuizAttempt extends Document {
  quiz: Types.ObjectId;
  answers: number[];
  score: number;
  attemptedAt: Date;
}

export interface IProgress extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  progressPercentage: number;
  quizAttempts: IQuizAttempt[];
}

const quizAttemptSchema = new Schema<IQuizAttempt>({
  quiz: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  answers: {
    type: [Number],
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

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
    quizAttempts: [quizAttemptSchema], // Array of quiz attempts
  },
  { timestamps: true }
);

// Ensure a user can only have one progress document per course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

const Progress = model<IProgress>("Progress", progressSchema);
export default Progress;
