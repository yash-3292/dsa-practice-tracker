const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Problem = require("../models/Problem");
const auth = require("../middleware/auth");

const router = express.Router();

// REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", {
        error: "Email already registered. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    // Add default problems for new user
    const defaultProblems = [
      { title: "Two Sum", platform: "LeetCode", topic: "Array", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/two-sum/" },
      { title: "Valid Anagram", platform: "LeetCode", topic: "String", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/valid-anagram/" },
      { title: "Binary Search", platform: "LeetCode", topic: "Binary Search", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/binary-search/" },
      { title: "Valid Parentheses", platform: "LeetCode", topic: "Stack", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/valid-parentheses/" },
      { title: "Reverse Linked List", platform: "LeetCode", topic: "Linked List", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { title: "Maximum Depth of Binary Tree", platform: "LeetCode", topic: "Tree", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { title: "Climbing Stairs", platform: "LeetCode", topic: "DP", difficulty: "Easy", status: "Not Started", link: "https://leetcode.com/problems/climbing-stairs/" },
      { title: "Longest Increasing Subsequence", platform: "LeetCode", topic: "DP", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { title: "Number of Islands", platform: "LeetCode", topic: "Graph", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/number-of-islands/" },
      { title: "Boredom", platform: "Codeforces", topic: "DP", difficulty: "Medium", status: "Not Started", link: "https://codeforces.com/problemset/problem/455/A" }
    ];

    for (const prob of defaultProblems) {
      await Problem.create({
        ...prob,
        userId: user._id
      });
    }

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

// -------------------- CHANGE PASSWORD --------------------
// show change password form (requires auth)
router.get("/change-password", auth, (req, res) => {
  res.render("change-password", { user: req.user, error: null });
});

// handle change password
router.post("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.render("change-password", { user: req.user, error: "Please fill all fields" });
  }

  if (newPassword !== confirmPassword) {
    return res.render("change-password", { user: req.user, error: "New passwords do not match" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.render("change-password", { user: req.user, error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.render("change-password", { user: req.user, error: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    // invalidate existing session token and require re-login
    res.clearCookie("token");
    res.redirect("/login");

  } catch (err) {
    console.error(err);
    res.render("change-password", { user: req.user, error: "Could not change password" });
  }
});

module.exports = router;

