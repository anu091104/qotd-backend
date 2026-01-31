const express = require("express");
const router = express.Router();
const { getTodaysQuestion, getQuestionById } = require("../controllers/questionController");

// GET today's question
router.get("/today", getTodaysQuestion);

// GET question by ID
router.get("/:id", getQuestionById);

module.exports = router;
