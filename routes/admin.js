const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

const { adminModel } = require("../db");
const { validateSignupBody } = require("../middlewares/signupvalidation");

adminRouter.post("/signup", validateSignupBody, async (req, res) => {
  const { email, password, firstName, lastName } = req.validatedData;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      email: email,
      password: hashedpassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "succesfull signup",
    });
  } catch (error) {
    // Check for duplicate email error (MongoDB duplicate key error code is 11000)
    if (error.code === 11000) {
      return res.status(403).json({
        message: "Email already exists",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const response = await adminModel.findOne({
    email: email,
  });

  if (!response) {
    res.status(403).json({
      message: "invalid credentials",
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, response.password);

  if (isMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Password",
    });
  }
});

adminRouter.post("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/course/bulk", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
