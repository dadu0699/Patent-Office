const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country.controller');

router.route('/:id')
    .get(countryController.get)
    .put(countryController.update)
    .delete(countryController.delete);

router.route('/')
    .get(countryController.get)
    .post(countryController.create);

module.exports = router;