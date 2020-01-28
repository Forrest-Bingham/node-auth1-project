const bc = require('bcryptjs')
const router = require('express').Router();

const Users = require('../user/user-model.js');

router.post('/', (req,res)=> {

    let user = req.body;

    const hash = bc.hashSync(req.body.password, 8);

    user.password = hash;
    
    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

module.exports = router;