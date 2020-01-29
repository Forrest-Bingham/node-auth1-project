const bc = require('bcryptjs')
const router = require('express').Router();

const Users = require('../user/user-model.js');

router.post('/', (req,res)=> {

    let { username, password } = req.body;

    Users.findBy({username})
    .first()
    .then( user=> {
        if(user && bc.compareSync(password, user.password)) {
            
                req.session.user = user;
                req.session.user.id = user.id;
                req.session.loggedIn = true; //which creates a loggedIn property on req.session
                console.log(req.session.user, " < -- Req.session.user")
                res.status(200).json({ message: `Welcome back ${user.username}`})
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        
    })
    .catch( error => {
        res.status(500).json(error);
    })

})


module.exports = router;