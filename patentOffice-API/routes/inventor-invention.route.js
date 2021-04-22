const express = require('express');
const router = express.Router();

const invController = require('../controllers/inventor-invention.controller');

router.route('/:id')
    .get(invController.get)
    .put(invController.update)
    .delete(invController.delete);

router.route('/')
    .get(invController.get)
    .post(invController.create);

module.exports = router;