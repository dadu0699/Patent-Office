const express = require('express');
const router = express.Router();

const borderController = require('../controllers/border.controller');

router.route('/:id')
    .get(borderController.get)
    .put(borderController.update)
    .delete(borderController.delete);

router.route('/')
    .get(borderController.get)
    .post(borderController.create);

module.exports = router;