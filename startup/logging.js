const winston = require('winston');
require('express-async-errors');
const winstonmongo = require('winston-mongodb');

module.exports = function(){
winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
 db:'mongodb://localhost/Node.jsFLIX',
 level: 'info'
});

process.on('uncaughtException', (ex) => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION');
  winston.error(ex.message, ex);

});

winston.handleExceptions(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: 'uncaughtExceptions.log'}));  


process.on('unhandledRejection', (ex) => {
  console.log('WE GOT AN UNHANDLED REJECTION');
  winston.error(ex.message, ex);

});

const promises = Promise.reject(new Error('Something is seriously wrong!'));
  promises.then(() => console.log('Done'));
};