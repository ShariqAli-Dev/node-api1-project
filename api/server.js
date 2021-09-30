// Imports
const express = require('express');
const users = require('./users/model');

// Instance
const server = express();

// Middleware
server.use(express.json());

// GETS
server.get('/api/users', (req, res) => {
  users
    .find()
    .then((users) => res.status(500).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'The user with the specified ID does not exist' })
    );
});

//POST
server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio)
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });

  users
    .insert(newUser)
    .then((insertedUser) => res.status(201).json(insertedUser))
    .catch((err) =>
      res.status(500).json({
        message: 'There was an error while saving the user to the database',
      })
    );
});

// POST

//DELETE

server.use('*', (req, res) => {
  res.status(200).json({ message: 'Nothing is here homie' });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
