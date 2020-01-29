1/28/2019 --- 

install npm i express-session
npm i connect-session-knex

in server.js --
    - const session = require('express-session');

    const sessionConfig = {
        name: 'beepboop' // default name is sid. 
        secret: secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
        cookie: {
            maxAge: 1000 * 30, // 1 second times 30
            secure: false, // false during development, true in production
            httpOnly: true, 
        },
        resave: false, 
        saveUninitialized: false, //GDPR Laws against setting cookies automatically, only true once the user opts in for cookies

    }

    server.use(session(sessionConfig));

    in login Router: 

if(user && bcrypt.compareSync(password))
    req.session.user = user;

--in restricted middleware file --


module.exports = (req,res, next) => {

    if(req.session & req.session.user) {
        next();
    } else {
        res.status(401).json({error: "You Shall Not Pass!"})
    }
}

--- create logout endpoint

router.get('/logout', (req,res) => {
    if(req.session){
        req.session.destroy( err => {
            if(err){
                res.json({ error: "Unable to log out})
            } else {
                res.status(200).json({ message: "Logged Out Successfully})
            }
        })
    }  else {
        res.status(200).json({ 
            message: "You were never logged in"
        })
    }
})

-----

