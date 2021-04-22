const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question.controller');

router.route('/:id')
    .get(questionController.get)
    .put(questionController.update)
    .delete(questionController.delete);

router.route('/')
    .get(questionController.get)
    .post(questionController.create);

module.exports = router;