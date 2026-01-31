const db = require('../models/inMemoryDB');

exports.getTodaysQuestion = (req, res) => {
  try {
    const question = db.getTodaysQuestion();
    
    // Return without solution for students
    const { expectedOutput, ...questionWithoutSolution } = question;
    
    res.status(200).json({
      success: true,
      data: questionWithoutSolution,
      hintCount: question.hints ? question.hints.length : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch question'
    });
  }
};

exports.getQuestionById = (req, res) => {
  try {
    const question = db.questions.find(q => q.id === req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }
    
    // Return without solution
    const { expectedOutput, ...questionWithoutSolution } = question;
    
    res.status(200).json({
      success: true,
      data: questionWithoutSolution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch question'
    });
  }
};