// src/controllers/lesson.controller.ts
import { Request, Response } from "express";
import Course from "../models/course.model";

// @desc    Add a lesson to a course (Admin only)
export const addLessonToCourse = async (req: Request, res: Response) => {
  try {
    const { title, videoUrl, resources } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newLesson = {
      title,
      videoUrl,
      resources: resources || [],
    };

    course.lessons.push(newLesson as any); // Add the new lesson
    await course.save(); // Save the entire course document

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
