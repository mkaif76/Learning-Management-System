import { Router } from "express";
import { protect, admin } from "../middlewares/auth.middleware";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollInCourse,
} from "../controllers/course.controller";
import { addLessonToCourse } from "../controllers/lesson.controller";
import { addQuizToCourse } from "../controllers/quiz.controller";

const router = Router();

// Route to get all courses (public)
router.get("/", getAllCourses);

// Route to get a single course by ID (public)
router.get("/:id", getCourseById);

// Route to create a new course (Admin only)
router.post("/", protect, admin, createCourse);

// Route to enroll in a course (Logged-in users only)
router.post("/:id/enroll", protect, enrollInCourse);

// Route to add a lesson to a course (Admin only)
router.post("/:courseId/lessons", protect, admin, addLessonToCourse);

// Route to add a quiz to a course (Admin only)
router.post("/:courseId/quizzes", protect, admin, addQuizToCourse);

export default router;
