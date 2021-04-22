const inventorModel = require('../models/inventor.model');

const inventorController = {
    create: (req, res) => {
        inventorModel.create(req.body, (err, results) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    data: err
                });
                return;
            }

            res.status(200).send({
                code: 200,
                data: results
            });
        });
    },
    update: (req, res) => {
        inventorModel.update(req.body, req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    data: err
                });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(500).send({
                    code: 404,
                    data: 'Not Found'
                });
            } else {
                res.status(200).send({
                    code: 200,
                    data: results
                });
            }
        });
    },
    delete: (req, res) => {
        inventorModel.delete(req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    data: err
                });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(500).send({
                    code: 404,
                    data: 'Not Found'
                });
            } else {
                res.status(200).send({
                    code: 200,
                    data: results
                });
            }
        });
    },
    get: (req, res) => {
        inventorModel.get(req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    data: err
                });
                return;
            }

            if (req.params.id) {
                if (results.length === 1) {
                    res.status(200).send({
                        code: 200,
                        data: results[0]
                    });
                } else {
                    res.status(500).send({
                        code: 404,
                        data: 'Not Found'
                    });
                }
            } else {
                res.status(200).send({
                    code: 200,
                    data: results
                });
            }
        });
    }
};

module.exports = inventorController;