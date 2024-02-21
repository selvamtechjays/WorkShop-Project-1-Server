// scoreboardController.js

const Scoreboard = require('../models/score-board');

// Controller function to save scoreboard data
const saveScoreboard = async (req, res) => {
  try {
    const { score, totalQuestions, questions, selectedOptions, correctAnswers } = req.body;

    const newScoreboard = new Scoreboard({
      score,
      totalQuestions,
      questions,
      selectedOptions,
      correctAnswers
    });

    await newScoreboard.save();

    res.status(201).json({ message: 'Scoreboard data saved successfully' });
  } catch (error) {
    console.error('Error saving scoreboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all scoreboard data
const getAllScoreboardData = async (req, res) => {
  try {
    const allScoreboardData = await Scoreboard.find();
    res.status(200).json(allScoreboardData);
  } catch (error) {
    console.error('Error getting scoreboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  saveScoreboard,getAllScoreboardData
};
