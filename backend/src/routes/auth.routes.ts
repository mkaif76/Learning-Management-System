import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import {
  signupValidationRules,
  loginValidationRules,
  validate,
} from "../middlewares/validation.middleware";

const router = Router();

router.post("/signup", signupValidationRules(), validate, signup);
router.post("/login", loginValidationRules(), validate, login);

export default router;
