const queryModel = require('../models/query.model');

const queryController = {
    query1: (_req, res) => {
        queryModel.query1((err, results) => {
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
    query2: (_req, res) => {
        queryModel.query2((err, results) => {
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
    query3: (_req, res) => {
        queryModel.query3((err, results) => {
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
    query4: (_req, res) => {
        queryModel.query4((err, results) => {
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
    query5: (_req, res) => {
        queryModel.query5((err, results) => {
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
    query6: (_req, res) => {
        queryModel.query6((err, results) => {
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
    query7: (_req, res) => {
        queryModel.query7((err, results) => {
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
    query8: (_req, res) => {
        queryModel.query8((err, results) => {
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
    query9: (_req, res) => {
        queryModel.query9((err, results) => {
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
    query10: (_req, res) => {
        queryModel.query10((err, results) => {
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
    query11: (_req, res) => {
        queryModel.query11((err, results) => {
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
    query12: (_req, res) => {
        queryModel.query12((err, results) => {
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
    query13: (_req, res) => {
        queryModel.query13((err, results) => {
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
    query14: (_req, res) => {
        queryModel.query14((err, results) => {
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
    query15: (_req, res) => {
        queryModel.query15((err, results) => {
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
    query16: (_req, res) => {
        queryModel.query16((err, results) => {
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
    query17: (_req, res) => {
        queryModel.query17((err, results) => {
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
    query18: (_req, res) => {
        queryModel.query18((err, results) => {
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
    query19: (_req, res) => {
        queryModel.query19((err, results) => {
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
    query20: (_req, res) => {
        queryModel.query20((err, results) => {
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
    }
};

module.exports = queryController;