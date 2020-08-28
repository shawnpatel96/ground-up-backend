const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// Routers
// const UserRouter = require('../users/users-router');
// const TeamRouter = require('../teams/teams-router');
// const AdminRouter = require('../admin/admin-router');
// const MetricsRouter = require('../metrics/metrics-router');


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/uploads',express.static('uploads')); // Make Uploads folder public
// server.use('/users', UserRouter);
// server.use('/teams', TeamRouter);

// server.use('/admin', AdminRouter);
// server.use('/metrics',MetricsRouter);

server.get('/', (req, res) => {
    res.send("Server Running")
});


module.exports = server;


