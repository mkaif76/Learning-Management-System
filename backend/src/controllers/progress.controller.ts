// src/controllers/progress.controller.ts
import { Request, Response } from "express";
import Progress from "../models/progress.model";
import Course from "../models/course.model";
import { Types } from "mongoose";

// @desc    Mark a lesson as complete
export const markLessonAsComplete = async (req: Request, res: Response) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find or create a progress document for the user and course
    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({ user: userId, course: courseId });
    }

    // Add lesson to completedLessons if it's not already there
    const lessonObjectId = new Types.ObjectId(lessonId);
    if (!progress.completedLessons.includes(lessonObjectId)) {
      progress.completedLessons.push(lessonObjectId);
    }

    // Recalculate progress percentage
    const totalLessons = course.lessons.length;
    if (totalLessons > 0) {
      progress.progressPercentage =
        (progress.completedLessons.length / totalLessons) * 100;
    }

    await progress.save();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get user's progress for a course
export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      return res.status(200).json({
        message: "User has not started this course.",
        progressPercentage: 0,
        completedLessons: [],
      });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Submit answers for a quiz and get the score

export const submitQuizAnswers = async (req: Request, res: Response) => {
  try {
    const { courseId, quizId } = req.params;
    const { answers } = req.body; // User's answers, e.g., [0, 1, 2]
    const userId = req.user._id;

    // 1. Find the course and the specific quiz
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const quiz = course.quizzes.find((q: any) => q._id.toString() === quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // 2. Calculate the score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;

    // 3. Find or create the user's progress document
    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({ user: userId, course: courseId });
    }

    // 4. Save the new attempt
    const newAttempt = {
      quiz: new Types.ObjectId(quizId),
      answers,
      score,
    };

    progress.quizAttempts.push(newAttempt as any);
    await progress.save();

    res.status(200).json({
      message: "Quiz submitted successfully!",
      attempt: newAttempt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
