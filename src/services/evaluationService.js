exports.evaluateSolution = (code, expectedOutput) => {
  // Mock evaluation logic
  // In real implementation, you'd run the code in a sandbox
  // For now, we'll do simple string matching
  
  try {
    // Simulate different evaluation scenarios
    const randomNum = Math.random();
    
    if (randomNum > 0.7) {
      return {
        isCorrect: true,
        result: 'Correct! All test cases passed.',
        score: 100
      };
    } else if (randomNum > 0.3) {
      return {
        isCorrect: false,
        result: 'Incorrect. 2 out of 5 test cases failed.',
        score: 60
      };
    } else {
      return {
        isCorrect: false,
        result: 'Time Limit Exceeded',
        score: 0
      };
    }
  } catch (error) {
    return {
      isCorrect: false,
      result: 'Runtime Error: ' + error.message,
      score: 0
    };
  }
};