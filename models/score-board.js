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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "UserId is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;
