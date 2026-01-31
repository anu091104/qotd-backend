const db = require('../models/inMemoryDB');

exports.getStatistics = (req, res) => {
  try {
    const todayQuestion = db.getTodaysQuestion();
    const todaySubmissions = db.submissions.filter(
      s => s.questionId === todayQuestion.id
    );
    
    res.status(200).json({
      success: true,
      data: {
        overall: {
          totalAttempts: db.stats.totalAttempts,
          correctSubmissions: db.stats.correctSubmissions,
          successRate: db.stats.successRate + '%'
        },
        today: {
          questionId: todayQuestion.id,
          title: todayQuestion.title,
          difficulty: todayQuestion.difficulty,
          attempts: todaySubmissions.length,
          correctToday: todaySubmissions.filter(s => s.isCorrect).length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
};

exports.getLeaderboard = (req, res) => {
  try {
    const leaderboard = db.getLeaderboard();
    
    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard'
    });
  }
};

exports.getQuestionStats = (req, res) => {
  try {
    const { questionId } = req.params;
    const questionSubmissions = db.submissions.filter(s => s.questionId === questionId);
    
    const stats = {
      totalAttempts: questionSubmissions.length,
      correctAttempts: questionSubmissions.filter(s => s.isCorrect).length,
      averageTime: questionSubmissions.reduce((acc, curr) => acc + curr.timeTaken, 0) / questionSubmissions.length || 0
    };
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch question statistics'
    });
  }
};