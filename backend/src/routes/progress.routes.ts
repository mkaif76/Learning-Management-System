import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  markLessonAsComplete,
  getCourseProgress,
} from "../controllers/progress.controller";

const router = Router();

// Route to get a user's progress for a specific course
router.get("/courses/:courseId", protect, getCourseProgress);

// Route to mark a lesson as complete
router.post(
  "/courses/:courseId/lessons/:lessonId/complete",
  protect,
  markLessonAsComplete
);

export default router;
