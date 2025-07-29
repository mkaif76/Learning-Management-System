import { Request, Response } from "express";
import Course from "../models/course.model";

export const addQuizToCourse = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // A basic validation to ensure questions and options are provided
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "A quiz must have at least one question." });
    }

    const newQuiz = {
      title,
      questions,
    };

    course.quizzes.push(newQuiz as any); // Add the new quiz
    await course.save(); // Save the entire course document

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
