const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", {
        error: "Email already registered. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword
    });

    res.redirect("/login");

  } catch (err) {
    console.error(err);
    res.render("register", {
      error: "Something went wrong. Try again."
    });
  }
});

// LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");

  } catch (err) {
    console.error(err);
    res.render("login", {
      error: "Login failed"
    });
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
