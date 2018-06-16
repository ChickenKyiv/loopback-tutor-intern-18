const Raven = require("raven");
Raven.config(
  "https://77aa2ee9a7ce484497f56278982a0809@sentry.io/305339"
).install();

 module.exports = function () {
     return function raven(err, req, res, next) {
        if(err) {
            console.log(`Raven reached: ${err}`);
            Raven.captureException(err);
        }
        next();
     }
 }