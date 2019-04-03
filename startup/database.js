const winston = require('winston');
const mongoose = require('mongoose');
const config = require ('config');

module.exports = function(){
const database = config.get('database');
mongoose.connect(config.get('database'))
    .then(() => winston.info(`Connected to ${config.get('database')}`));
}