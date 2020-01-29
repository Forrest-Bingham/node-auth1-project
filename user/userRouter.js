const bc = require('bcryptjs')
const router = require('express').Router();
const restricted = require('../restricted-middleware.js')

const Users = require('../user/user-model.js');

router.use(restricted);

router.get('/', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  router.get('/logout', (req,res)=> {
      if(req.session){
         req.session.destroy( err => {
             if(err){
                res.status(500).json({message: "You need to be logged in before you can logout"})
             } else {
                res.status(200).json({ message: "You are logged out"})
             }
         });
      } else {
          res.status(204).json({
              message: "Logged out and stuff"
          })
      }
  })
  

module.exports = router;