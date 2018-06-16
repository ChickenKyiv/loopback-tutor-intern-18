const Raven = require("raven");
const CONSTANTS = require("../constants");
Raven.config(CONSTANTS.RAVEN_URI).install();

 module.exports = function () {
     return function raven(err, req, res, next) {
        if(err) {
            console.log(`Raven reached: ${err}`);
            Raven.captureException(err);
        }
        next();
     }
 }