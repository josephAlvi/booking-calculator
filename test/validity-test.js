const expect = require("chai").expect;
const bookingHelper = require("../helpers/booking-helper");

describe("Invalid Booking - less than an hour", () => {
  it("isBookingValid function should return false", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-18T18:00:00+11:00",
      "2017-10-18T18:30:00+11:00"
    );
    expect(result).to.equal(false);
  });
});

describe("Invalid Booking - more than 24 hours", () => {
  it("isBookingValid function should return false", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-18T18:00:00+11:00",
      "2017-10-19T18:30:00+11:00"
    );
    expect(result).to.equal(false);
  });
});

describe("Invalid Booking - end date time before start date time", () => {
  it("isBookingValid function should return false", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-19T19:00:00+11:00",
      "2017-10-19T18:30:00+11:00"
    );
    expect(result).to.equal(false);
  });
});

describe("Invalid Booking - not in 15 min increments", () => {
  it("isBookingValid function should return false", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-19T19:15:00+11:00",
      "2017-10-19T19:40:00+11:00"
    );
    expect(result).to.equal(false);
  });
});

describe("Edge Case - minutes diff increments by 15 but start/end time not increments of 15", () => {
  it("isBookingValid function should return false", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-19T19:10:00+11:00",
      "2017-10-19T19:40:00+11:00"
    );
    expect(result).to.equal(false);
  });
});

describe("Positive Case - A valid booking", () => {
  it("isBookingValid function should return true", async () => {
    const result = await bookingHelper.isBookingValid(
      "2017-10-23T08:00:00+11:00",
      "2017-10-23T09:30:00+11:00"
    );
    expect(result).to.equal(true);
  });
});
