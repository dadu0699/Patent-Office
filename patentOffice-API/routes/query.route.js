const express = require('express');
const router = express.Router();

const queryController = require('../controllers/query.controller');

router.route('/report-1').get(queryController.query1);
router.route('/report-2').get(queryController.query2);
router.route('/report-3').get(queryController.query3);
router.route('/report-4').get(queryController.query4);
router.route('/report-5').get(queryController.query5);
router.route('/report-6').get(queryController.query6);
router.route('/report-7').get(queryController.query7);
router.route('/report-8').get(queryController.query8);
router.route('/report-9').get(queryController.query9);
router.route('/report-10').get(queryController.query10);
router.route('/report-11').get(queryController.query11);
router.route('/report-12').get(queryController.query12);

module.exports = router;