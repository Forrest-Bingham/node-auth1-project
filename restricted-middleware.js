
module.exports = (req,res, next) => {

    if(req.session && req.session.loggedIn) {
        console.log('req.session', req.session)
        next();
    } else {
        res.status(401).json({error: "You Shall Not Pass!"})
    }

    // console.log(req.session);
    // next();
}

