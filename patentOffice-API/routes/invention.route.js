const express = require('express');
const router = express.Router();

const inventionController = require('../controllers/invention.controller');

router.route('/:id')
    .get(inventionController.get)
    .put(inventionController.update)
    .delete(inventionController.delete);

router.route('/')
    .get(inventionController.get)
    .post(inventionController.create);

module.exports = router;