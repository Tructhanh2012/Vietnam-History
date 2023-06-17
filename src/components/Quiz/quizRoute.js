const express = require('express');
const db = require('./database.js');

const router = express.Router();

// Route to fetch quiz questions
router.get('/questions', async (req, res) => {
    try {
        const query = 'SELECT * FROM questions';
        const questions = await db(query);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Route to submit the quiz
router.post('/submit', (req, res) => {
    const answers = req.body.answers;
    // Quiz scoring logic and saving the score to the database
    // ...
    res.json({ score: calculatedScore });
});

module.exports = router;
