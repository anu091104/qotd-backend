const db = require('../models/inMemoryDB');
const { evaluateSolution } = require('../services/evaluationService');

exports.submitSolution = (req, res) => {
  try {
    const { userId, questionId, code, language } = req.body;
    
    if (!userId || !questionId || !code) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const question = db.questions.find(q => q.id === questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }
    
    // Evaluate solution
    const evaluationResult = evaluateSolution(code, question.expectedOutput);
    
    const submission = {
      id: Date.now().toString(),
      userId,
      questionId,
      code,
      language: language || 'javascript',
      isCorrect: evaluationResult.isCorrect,
      result: evaluationResult.result,
      timeTaken: Math.floor(Math.random() * 100) + 30, // Mock time in seconds
      submittedAt: new Date().toISOString()
    };
    
    db.addSubmission(submission);
    
    res.status(201).json({
      success: true,
      data: {
        submissionId: submission.id,
        isCorrect: submission.isCorrect,
        result: submission.result,
        timeTaken: submission.timeTaken
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Submission failed'
    });
  }
};

exports.getUserSubmissions = (req, res) => {
  try {
    const { userId } = req.params;
    const userSubmissions = db.submissions.filter(s => s.userId === userId);
    
    res.status(200).json({
      success: true,
      data: userSubmissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
};