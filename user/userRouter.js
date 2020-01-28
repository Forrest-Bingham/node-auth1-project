const bc = require('bcryptjs')
const router = require('express').Router();

const Users = require('../user/user-model.js');

router.get('/', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router;