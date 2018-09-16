"use strict";
//requires
const moment = require("moment");

//these helper functions does all the calculations.
//isBookingValid checks the validity of a given booking
//calculateFee calculates fee for a given booking
module.exports = {
  isBookingValid: (from, to) => {
    try {
      const fromDateTime = moment(from, "YYYY-MM-DD HH:mm:ss Z");
      const toDateTime = moment(to, "YYYY-MM-DD HH:mm:ss Z");
      const minDiff = toDateTime.diff(fromDateTime, "minutes");

      if (
        minDiff < 60 ||
        minDiff > 1440 ||
        toDateTime.minutes() % 15 != 0 ||
        fromDateTime.minutes() % 15 != 0
      )
        return false;
      else return true;
    } catch (ex) {
      throw ex;
    }
  },
  calculateFee: (from, to) => {
    try {
      const fromDateTime = moment(from, "YYYY-MM-DD HH:mm:ss Z");
      const toDateTime = moment(to, "YYYY-MM-DD HH:mm:ss Z");
      const minDiff = toDateTime.diff(fromDateTime, "minutes");

      // I am assuming that if any hour of the booking falls on a sunday then the whole booking is
      // charged with sunday rates. This assumption is based on the fact that if any hour falls
      // between night rates then the whole booking is charged with night rates and also on the fact
      // that sunday rates are greater than any other rates :D

      if (fromDateTime.weekday() == 0 || toDateTime.weekday() == 0) {
        return 1 * (minDiff * (60.85 / 60)).toFixed(2);
      }
      //same assumption/logic with Saturday, but only if to/from falls in Saturday and not on Sunday
      else if (fromDateTime.weekday() == 6 || toDateTime.weekday() == 6) {
        return 1 * (minDiff * (45.91 / 60)).toFixed(2);
      }
      //else if anyone is in day rate window
      else if (
        6 < fromDateTime.hours() &&
        fromDateTime.hours() < 20 &&
        6 < toDateTime.hours() &&
        toDateTime.hours() < 20 &&
        toDateTime.hours() > fromDateTime.hours()
      ) {
        return 1 * (minDiff * (38 / 60)).toFixed(2);
      }
      //else night rates
      else {
        return 1 * (minDiff * (42.93 / 60)).toFixed(2);
      }

      return 0;
    } catch (ex) {
      throw ex;
    }
  }
};
