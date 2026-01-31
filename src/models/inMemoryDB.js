// In-memory database
let questions = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    problemStatement: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    expectedOutput: '[0,1]',
    hints: ['Try using a hash map', 'Think about time complexity'],
    date: new Date().toISOString().split('T')[0], // Today's date
    category: 'Array'
  },
  {
    id: '2',
    title: 'Reverse String',
    difficulty: 'Easy',
    problemStatement: 'Reverse a string in-place.',
    sampleInput: 's = ["h","e","l","l","o"]',
    sampleOutput: '["o","l","l","e","h"]',
    expectedOutput: '["o","l","l","e","h"]',
    hints: ['Use two pointers', 'Swap elements from both ends'],
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    category: 'String'
  }
];

let submissions = [];
let stats = {
  totalAttempts: 0,
  correctSubmissions: 0,
  successRate: 0
};

module.exports = {
  questions,
  submissions,
  stats,
  getTodaysQuestion: () => {
    const today = new Date().toISOString().split('T')[0];
    return questions.find(q => q.date === today) || questions[0];
  },
  addSubmission: (submission) => {
    submissions.push(submission);
    stats.totalAttempts++;
    if (submission.isCorrect) {
      stats.correctSubmissions++;
    }
    stats.successRate = (stats.correctSubmissions / stats.totalAttempts * 100).toFixed(2);
  },
  getLeaderboard: () => {
    return submissions
      .filter(s => s.isCorrect)
      .sort((a, b) => a.timeTaken - b.timeTaken)
      .slice(0, 10)
      .map((sub, index) => ({
        rank: index + 1,
        userId: sub.userId,
        questionId: sub.questionId,
        timeTaken: sub.timeTaken,
        submittedAt: sub.submittedAt
      }));
  }
};