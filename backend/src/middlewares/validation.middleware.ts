// src/middlewares/validation.middleware.ts
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Define the validation rules for the signup route
export const signupValidationRules = () => {
  return [
    // name must not be empty
    body("name").trim().not().isEmpty().withMessage("Name is required."),

    // email must be a valid email
    body("email").isEmail().withMessage("Please include a valid email."),

    // password must not be empty and at least 6 chars long
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ];
};

// Define the validation rules for the login route
export const loginValidationRules = () => {
  return [
    // email must be a valid email
    body("email").isEmail().withMessage("Please include a valid email."),

    // password must not be empty and at least 6 chars long
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ];
};

// Middleware to check for validation errors
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Extract and format error messages
  const extractedErrors: { [key: string]: string }[] = [];
  errors.array().map((err) => {
    if (err.type === "field") {
      extractedErrors.push({ [err.path]: err.msg });
    }
  });

  return res.status(400).json({
    errors: extractedErrors,
  });
};
