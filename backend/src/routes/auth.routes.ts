import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import {
  signupValidationRules,
  loginValidationRules,
  validate,
} from "../middlewares/validation.middleware";
import { authLimiter } from "../config/rateLimiter";

const router = Router();

router.post("/signup", authLimiter, signupValidationRules(), validate, signup);
router.post("/login", authLimiter, loginValidationRules(), validate, login);

export default router;
