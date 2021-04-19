const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send({
        Carnet: '201801266',
        Nombre: 'Didier Domìnguez',
        Curso: ''
    });
});

module.exports = router;