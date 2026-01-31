const express = require("express");
const router = express.Router();
const { submitSolution, getUserSubmissions } = require("../controllers/submissionController");

// POST submit solution
router.post("/", submitSolution);

// GET user's submissions
router.get("/user/:userId", getUserSubmissions);

module.exports = router;
