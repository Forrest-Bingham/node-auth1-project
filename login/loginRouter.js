const bc = require('bcryptjs')
const router = require('express').Router();

const Users = require('../user/user-model.js');

router.post('/', (req,res)=> {

    let { username, password } = req.body;

    Users.findBy({username})
    .first()
    .then( user=> {
        if(user && bc.compareSync(password, user.password)) {
            // if(user){
                // compare().then(match => {
                //     if(match){
                //         console.log("Passwords match")
                //         // res.status(200).json(user);
                //     } else {
                //         res.status(400).json({error: "Passwords do not match"})
                //     } 
                // })
                // .catch( error => {
                //         res.status(500).json({ error: "Unable to create account"})
                // })
                res.status(200).json({ message: `Welcome ${user.username}`})
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        
    })
    .catch( error => {
        res.status(500).json(error);
    })

})


module.exports = router;