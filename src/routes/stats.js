const express = require("express");
const router = express.Router();
const { getStatistics, getLeaderboard, getQuestionStats } = require("../controllers/statsController");

// GET overall statistics
router.get("/", getStatistics);

// GET leaderboard
router.get("/leaderboard", getLeaderboard);

// GET question-specific stats
router.get("/question/:questionId", getQuestionStats);

module.exports = router;
