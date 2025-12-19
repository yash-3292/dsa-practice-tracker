const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const auth = require("../middleware/auth");
const User = require("../models/User");

// Protect all problem routes
router.use(auth);

// PROFILE - view and update own profile
router.get("/profile", async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.redirect("/");
  res.render("profile", { user });
});

router.post("/profile", async (req, res) => {
  const { codeforces = "", codechef = "", leetcode = "" } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    codeforces: codeforces.trim(),
    codechef: codechef.trim(),
    leetcode: leetcode.trim()
  });

  res.redirect("/profile");
});

// HOME
router.get("/", async (req, res) => {
  const {
    search = "",
    topic = "",
    difficulty = "",
    status = ""
  } = req.query;

  let query = { userId: req.user.id };

  if (search) query.title = { $regex: search, $options: "i" };
  if (topic) query.topic = topic;
  if (difficulty) query.difficulty = difficulty;
  if (status) query.status = status;

  const problems = await Problem.find(query);

  const totalCount = problems.length;
  const solvedCount = problems.filter(p => p.status === "Solved").length;
  const revisionCount = problems.filter(p => p.status === "Revision").length;
  const notStartedCount = problems.filter(p => p.status === "Not Started").length;

  const easyCount = problems.filter(p => p.difficulty === "Easy").length;
  const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
  const hardCount = problems.filter(p => p.difficulty === "Hard").length;

  const solvedWidth = totalCount ? `${(solvedCount / totalCount) * 100}%` : "0%";
  const revisionWidth = totalCount ? `${(revisionCount / totalCount) * 100}%` : "0%";
  const notStartedWidth = totalCount ? `${(notStartedCount / totalCount) * 100}%` : "0%";

  res.render("index", {
    problems,
    totalCount,
    solvedCount,
    revisionCount,
    notStartedCount,
    easyCount,
    mediumCount,
    hardCount,
    solvedWidth,
    revisionWidth,
    notStartedWidth,
    search,
    topic,
    difficulty,
    status,
    user: req.user
  });
});

// ADD PROBLEM PAGE
router.get("/add", (req, res) => {
  res.render("add");
});

// ADD
router.post("/add", async (req, res) => {
  const { title, platform, topic, difficulty, link } = req.body;

  await Problem.create({
    title,
    platform,
    topic,
    difficulty,
    link,
    status: "Not Started",
    userId: req.user.id
  });

  res.redirect("/");
});

// UPDATE STATUS
router.post("/update/:id", async (req, res) => {
  await Problem.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { status: req.body.status }
  );

  res.redirect("/");
});

// EDIT PAGE
router.get("/edit/:id", async (req, res) => {
  const problem = await Problem.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!problem) return res.redirect("/");
  res.render("edit", { problem });
});

// EDIT SUBMIT (THIS WAS MISSING)
router.post("/edit/:id", async (req, res) => {
  const { title, platform, topic, difficulty, link } = req.body;

  await Problem.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, platform, topic, difficulty, link }
  );

  res.redirect("/");
});

// DELETE
router.post("/delete/:id", async (req, res) => {
  await Problem.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.redirect("/");
});

module.exports = router;
