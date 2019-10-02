if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:admin@master-cluster-nwspo.mongodb.net/hacktiv-overflow?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const user = require('./routes/user');
app.use('/user', user);

const question = require('./routes/question');
app.use('/question', question);

const comment = require('./routes/comment');
app.use('/comment', comment); 

const answer = require('./routes/answer');
app.use('/answer', answer); 

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;