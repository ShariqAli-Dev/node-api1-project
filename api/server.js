// Imports
const express = require('express');
const Users = require('./users/model');

// Instance
const server = express();

// Middleware
server.use(express.json());

// GET
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

// PUT
server.put('/api/users/:id', (req, res) => {
  const updatedUserInfo = req.body;
  const { id } = req.params;

  if (!updatedUserInfo.name || !updatedUserInfo.bio)
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });

  Users.update(id, updatedUserInfo)
    .then((updatedUser) => {
      if (!updatedUser)
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });

      res.status(201).json(updatedUser);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'The user information could not be modified' })
    );
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
  const userId = req.body;

  Users.remove(userId)
    .then((deletedUser) => {
      if (!deletedUser)
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' });
      res.status(201).json(deletedUser);
    })
    .catch((err) =>
      res.status(500).json({ message: 'The user could not be remove' })
    );
});

server.use('*', (req, res) => {
  res.status(200).json(req.body);
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
