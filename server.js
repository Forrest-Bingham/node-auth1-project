const express = require('express');

const registerRouter = require('./register/registerRouter');
const loginRouter = require('./login/loginRouter');
const userRouter = require('./user/userRouter');

const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', userRouter);

module.exports = server;
