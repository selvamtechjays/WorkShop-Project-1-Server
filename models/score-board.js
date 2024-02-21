// scoreboardModel.js

const mongoose = require('mongoose');

const scoreboardSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  questions: [{
    questionText: String
   
  }],
  selectedOptions: [String], 
  correctAnswers: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;
