// Imports
const express = require('express');
const Users = require('./users/model');

// Instance
const server = express();

// Middleware
server.use(express.json());

// GETS
server.get('/api/users/:id', (req, res) => {
  const userId = req.body;

  Users.findById(userId)
    .then((user) => {
      if (!user)
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });
      res.status(201).json(user);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'The user information could not be retrieved' })
    );
});

server.get('/api/users', (req, res) => {
  Users.find()
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

  Users.insert(newUser)
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
