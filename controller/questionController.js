
const Question = require('../models/questionSchema');

// GET all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new question
const createQuestions = async (req, res) => {
    const question = new Question({
        questionText: req.body.questionText,
        options: req.body.options,
        correctOptionIndex: req.body.correctOptionIndex,
         imageUrl:req.body.imageUrl
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
  getAllQuestions,
  createQuestions,
}
