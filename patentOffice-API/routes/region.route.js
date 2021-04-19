const express = require('express');
const router = express.Router();

const regionController = require('../controllers/region.controller');

router.route('/:id')
    .get(regionController.get)
    .put(regionController.update)
    .delete(regionController.delete);

router.route('/')
    .get(regionController.get)
    .post(regionController.create);

module.exports = router;