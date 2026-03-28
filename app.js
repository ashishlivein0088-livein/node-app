require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const pageRoutes = require('./routes/pageRoutes');
const todoRoutes = require('./routes/todoRoutes');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRoutes);
app.use('/api/todos', todoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
