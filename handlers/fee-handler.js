"use strict";

//project references
const bookingHelper = require("../helpers/booking-helper");

//this module serves as a middleware for calculating booking fees and mapping input to output
module.exports = {
  calculateBookingFee: bookings => {
    //creates a new array from input array. new array contains additional isValid and total 
    const bookingFees = bookings.map(booking => {
      let bookingFee = Object.assign({}, booking);
      if (!bookingHelper.isBookingValid(booking.from, booking.to)) {
        bookingFee.isValid = false;
        bookingFee.total = 0;
      } else {
        bookingFee.isValid = true;
        bookingFee.total = bookingHelper.calculateFee(booking.from, booking.to);
      }
      return bookingFee;
    });

    return bookingFees;
  }
};
