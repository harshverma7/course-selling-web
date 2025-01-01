const express = require("express");
const { z } = require("zod");

const signupbody = z.object({
  email: z.string().max(35).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password cannot exceed 32 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message:
        "Password must contain at least one special character (@$!%*?&#)",
    }),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

function validateSignupBody(req, res, next) {
  const validation = signupbody.safeParse(req.body);

  if (!validation.success) {
    return res.status(403).json({
      message: validation.error.issues[0].message,
    });
  }

  req.validatedData = validation.data;
  next();
}

module.exports = {
  validateSignupBody,
};
