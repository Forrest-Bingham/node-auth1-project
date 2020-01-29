const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session'); // install
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('./dbConfig.js');


const registerRouter = require('./register/registerRouter');
const loginRouter = require('./login/loginRouter');
const userRouter = require('./user/userRouter');


const configureMiddleware = require('./configure-middleware.js');


const server = express();



const sessionConfig = {
    name: 'beepboop', // default name is sid. 
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 30, // 1 second times 30
        secure: false, // false during development, true in production
        httpOnly: true, 
    },
    resave: false, 
    saveUninitialized: false, //GDPR Laws against setting cookies automatically, only true once the user opts in for cookies
    store: new KnexSessionStore({ // only add after KnexSessionStore
            knex: dbConnection,
            tablename: 'sessions',
            sidfield: 'sid',
            createtable: true,
            clearInterval: 60000
    })
}



server.use(helmet());
server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());


server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', userRouter);

configureMiddleware(server);

module.exports = server;
