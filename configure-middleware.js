const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const session = require('express-session');


module.exports = function(server) {
    server.use(helmet());
    // server.use(session(sessionConfig));
    server.use(express.json());
    server.use(cors());
};
