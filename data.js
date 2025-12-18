const mongoose = require("mongoose");
require("dotenv").config();
const Problem = require("./models/Problem");

mongoose.connect("mongodb://127.0.0.1:27017/dsaTracker")
  .then(() => console.log("DB Connected for Seeding"));

const sampleData = [
  // Arrays / Basics
  { title: "Two Sum", platform: "LeetCode", topic: "Array", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/two-sum/" },
  { title: "Best Time to Buy and Sell Stock", platform: "LeetCode", topic: "Array", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { title: "Maximum Subarray", platform: "LeetCode", topic: "Kadane", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/maximum-subarray/" },
  { title: "Rotate Array", platform: "LeetCode", topic: "Array", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/rotate-array/" },

  // Strings
  { title: "Valid Anagram", platform: "LeetCode", topic: "String", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/valid-anagram/" },
  { title: "Longest Substring Without Repeating Characters", platform: "LeetCode", topic: "Sliding Window", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },

  // Binary Search
  { title: "Binary Search", platform: "LeetCode", topic: "Binary Search", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/binary-search/" },
  { title: "Search in Rotated Sorted Array", platform: "LeetCode", topic: "Binary Search", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },

  // Stack
  { title: "Valid Parentheses", platform: "LeetCode", topic: "Stack", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/valid-parentheses/" },
  { title: "Next Greater Element I", platform: "LeetCode", topic: "Stack", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/next-greater-element-i/" },

  // Linked List
  { title: "Reverse Linked List", platform: "LeetCode", topic: "Linked List", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/reverse-linked-list/" },
  { title: "Detect Cycle in Linked List", platform: "LeetCode", topic: "Linked List", difficulty: "Easy", status: "Revision", link: "https://leetcode.com/problems/linked-list-cycle/" },

  // Trees
  { title: "Maximum Depth of Binary Tree", platform: "LeetCode", topic: "Tree", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { title: "Binary Tree Level Order Traversal", platform: "LeetCode", topic: "Tree", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { title: "Lowest Common Ancestor", platform: "LeetCode", topic: "Tree", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },

  // Graphs
  { title: "Number of Islands", platform: "LeetCode", topic: "Graph", difficulty: "Medium", status: "Solved", link: "https://leetcode.com/problems/number-of-islands/" },
  { title: "Course Schedule", platform: "LeetCode", topic: "Graph", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/course-schedule/" },

  // DP
  { title: "Climbing Stairs", platform: "LeetCode", topic: "DP", difficulty: "Easy", status: "Solved", link: "https://leetcode.com/problems/climbing-stairs/" },
  { title: "House Robber", platform: "LeetCode", topic: "DP", difficulty: "Medium", status: "Solved", link: "https://leetcode.com/problems/house-robber/" },
  { title: "Longest Increasing Subsequence", platform: "LeetCode", topic: "DP", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },

  // Greedy
  { title: "Jump Game", platform: "LeetCode", topic: "Greedy", difficulty: "Medium", status: "Solved", link: "https://leetcode.com/problems/jump-game/" },
  { title: "Gas Station", platform: "LeetCode", topic: "Greedy", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/gas-station/" },

  // Codeforces
  { title: "LIS on CF", platform: "Codeforces", topic: "DP", difficulty: "Medium", status: "Revision", link: "https://codeforces.com/problemset/problem/455/A" },
  { title: "Two Pointers CF", platform: "Codeforces", topic: "Two Pointers", difficulty: "Easy", status: "Solved", link: "https://codeforces.com/problemset/problem/381/A" },
  { title: "Prefix Sums", platform: "Codeforces", topic: "Prefix Sum", difficulty: "Easy", status: "Solved", link: "https://codeforces.com/problemset/problem/363/B" },
  { title: "Binary Lifting LCA", platform: "Codeforces", topic: "Tree", difficulty: "Hard", status: "Not Started", link: "https://codeforces.com/problemset/problem/1304/E" },

  // Misc
  { title: "Top K Frequent Elements", platform: "LeetCode", topic: "Heap", difficulty: "Medium", status: "Solved", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { title: "Merge Intervals", platform: "LeetCode", topic: "Intervals", difficulty: "Medium", status: "Revision", link: "https://leetcode.com/problems/merge-intervals/" },
  { title: "Subsets", platform: "LeetCode", topic: "Backtracking", difficulty: "Medium", status: "Solved", link: "https://leetcode.com/problems/subsets/" },
  { title: "Permutations", platform: "LeetCode", topic: "Backtracking", difficulty: "Medium", status: "Not Started", link: "https://leetcode.com/problems/permutations/" },

  // Hard (few)
  { title: "Trapping Rain Water", platform: "LeetCode", topic: "Two Pointers", difficulty: "Hard", status: "Revision", link: "https://leetcode.com/problems/trapping-rain-water/" },
  { title: "Median of Two Sorted Arrays", platform: "LeetCode", topic: "Binary Search", difficulty: "Hard", status: "Not Started", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" }
];

async function seed() {
  await Problem.deleteMany();
  await Problem.insertMany(sampleData);
  console.log("Database Seeded");
  mongoose.connection.close();
}

seed();
