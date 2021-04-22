const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answer.controller');

router.route('/:id')
    .get(answerController.get)
    .put(answerController.update)
    .delete(answerController.delete);

router.route('/')
    .get(answerController.get)
    .post(answerController.create);

module.exports = router;