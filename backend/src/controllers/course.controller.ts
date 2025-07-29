// src/controllers/course.controller.ts
import { Request, Response } from "express";
import Course from "../models/course.model";
import User from "../models/user.model";

// @desc    Create a new course (Admin only)
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, instructor, price } = req.body;
    const newCourse = new Course({ title, description, instructor, price });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all available courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get a single course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Enroll in a course (Logged-in users only)
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id as string;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the user is already enrolled in the course
    if (user?.enrolledCourses.some((id) => id.toString() === courseId)) {
      return res.status(400).json({ message: "User already enrolled" });
    }

    user?.enrolledCourses.push(courseId as any);
    await user?.save();

    res.status(200).json({ message: "Successfully enrolled in course" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
