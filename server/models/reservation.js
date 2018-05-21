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
};
