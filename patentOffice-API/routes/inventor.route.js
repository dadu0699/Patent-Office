const express = require('express');
const router = express.Router();

const inventorController = require('../controllers/inventor.controller');

router.route('/:id')
    .get(inventorController.get)
    .put(inventorController.update)
    .delete(inventorController.delete);

router.route('/')
    .get(inventorController.get)
    .post(inventorController.create);

module.exports = router;