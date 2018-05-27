"use strict";
const Raven = require("raven");
Raven.config('https://77aa2ee9a7ce484497f56278982a0809@sentry.io/305339').install()

module.exports = function(Reservation) {
  function dateValidator(err) {
    if (this.startDate >= this.endDate) {
      err();
    }
  }

  function sendEmail(campground) {
     Reservation.app.models.Email.send(formEmailObject(campground),function(err, mail) {
      if(err) {
        console.log(err)
        Raven.captureException(err);
      } else {
        console.log(mail);
        console.log('email sent!');
      }
    })
  }

  function formEmailObject(campground) {
    return {
      to: 'loopbackintern@yopmail.com',
      from: 'noreply@optis.be',
      subject: 'Thank you for your reservation at ' + campground.name,
      html: '<p>We confirm your reservation for <strong>' + campground.name + '</strong></p>'
    }
  }

  Reservation.validate("startDate", dateValidator, {
    message: "endDate should be after startDate"
  });

   Reservation.observe("after save", async function(ctx, next) {
     try {
       const campground = await Reservation.app.models.Campground.findById(ctx.instance.campgroundId);
       sendEmail(campground);
     } catch(e) {
       Raven.captureException(e);
       next(e);
     }
   })
};
