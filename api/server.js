// Imports
const express = require('express');
const users = require('./users/model');

// Instance
const server = express();

// Middleware
server.use(express.json());

// GETS

//POST

// POST

//DELETE

server.use('*', (req, res) => {
  res.status(200).json({ message: 'Nothing is here homie' });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
