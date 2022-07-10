const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
let config = require('config');
const port = 3000;
const routes = require('./app/routes');

const app = express();
console.log(config);

//>---------------------- set connection for database

mongoose.connect(config.DBHost, { useNewUrlParser: true });

//>---------------------- set use for app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(routes);

//>-------------------- Listen server is run

app.listen(port, () => {
    console.log(chalk.red.bgWhite(`listening on port ${port}`));
});


//>-------------------- export app

module.exports = app;
