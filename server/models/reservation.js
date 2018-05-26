"use strict";

module.exports = function(Reservation) {
  function dateValidator(err) {
    if (this.startDate >= this.endDate) {
      err();
    }
  }

  Reservation.validate("startDate", dateValidator, {
    message: "endDate should be after startDate"
  });

  Reservation.observe("after save", function(ctx, next) {
    Reservation.app.models.Campground.findById(ctx.instance.campgroundId, function(err, campground) {
      Reservation.app.models.Email.send({
        to: 'loopbackintern@yopmail.com',
        from: 'noreply@optis.be',
        subject: 'Thank you for your reservation at ' + campground.name,
        html: '<p>We confirm your reservation for <strong>' + campground.name + '</strong></p>'
      }, function (err, mail) {
        if(err) {
          console.log(err);
        } else {
          console.log('email sent!');
        }
      });
    });
    next();
  })
};
