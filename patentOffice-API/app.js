const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Routes import
const indexRouter = require('./routes/index.route');
const queryRouter = require('./routes/query.route');
const regionRouter = require('./routes/region.route');
const countryRouter = require('./routes/country.route');
const borderRouter = require('./routes/border.route');
const questionRouter = require('./routes/question.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
    // application/x-www-form-urlencoded
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/query', queryRouter);
app.use('/region', regionRouter);
app.use('/country', countryRouter);
app.use('/border', borderRouter);
app.use('/question', questionRouter);

// Port assignment
app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`);
});

// Catch 404
app.use((_req, res, _next) => {
    res.status(404).send({
        Error: 404,
        Descripcion: 'Pagina no encontrada'
    });
});