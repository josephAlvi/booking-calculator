const expect = require("chai").expect;
const bookingHelper = require("../helpers/booking-helper");

describe("Day Rate - Booking hours within day rate", () => {
  it("calculateFee should return 76 for 2 hour day rate booking", async () => {
    const result = await bookingHelper.calculateFee(
      "2017-10-18T17:00:00+11:00",
      "2017-10-18T19:00:00+11:00"
    );
    expect(result).to.equal(76);
  });
});

describe("Night Rate - Booking hours within night rate", () => {
  it("calculateFee should return 85.86 for 2 hour night rate booking", async () => {
    const result = await bookingHelper.calculateFee(
      "2017-10-18T20:15:00+11:00",
      "2017-10-18T22:15:00+11:00"
    );
    expect(result).to.equal(85.86);
  });
});

describe("Overlapping Day/Night - Booking hours with overlapping day/night rate", () => {
  it("should return 193.19 for 4.5 hour overlapping with 1 hour ending at night", async () => {
    const result = await bookingHelper.calculateFee(
      "2017-10-18T16:00:00+11:00",
      "2017-10-18T20:30:00+11:00"
    );
    expect(result).to.equal(193.19);
  });
});

describe("Overlapping Day/Night - Booking hours with overlapping day/night rate", () => {
  it("should return 193.19 for 4.5 hour overlapping with 1 hour starting at night", async () => {
    const result = await bookingHelper.calculateFee(
      "2017-10-18T5:00:00+11:00",
      "2017-10-18T09:30:00+11:00"
    );
    expect(result).to.equal(193.19);
  });
});

describe("Edge case Day/Night - starting and ending hours in day rate but night passed in between", () => {
  it("should return 987.39 for 23 hour booking during day but spanning over night rates", async () => {
    const result = await bookingHelper.calculateFee(
      "2017-10-18T18:00:00+11:00",
      "2017-10-19T17:00:00+11:00"
    );
    expect(result).to.equal(987.39);
  });
});

describe("Saturday Rate - Booking hours within saturday rate", () => {
  it("calculateFee should return 91.82 for 2 hour saturday rate booking", async () => {
    const result = await bookingHelper.calculateFee(
      "2018-09-15T18:15:00+11:00",
      "2018-09-15T20:15:00+11:00"
    );
    expect(result).to.equal(91.82);
  });
});

describe("Sunday Rate - Booking hours within sunday rate", () => {
  it("calculateFee should return 121.7 for 2 hour sunday rate booking", async () => {
    const result = await bookingHelper.calculateFee(
      "2018-09-16T18:15:00+11:00",
      "2018-09-16T20:15:00+11:00"
    );
    expect(result).to.equal(121.7);
  });
});

describe("Saturday Rate - overlapping with weekday", () => {
  it("should return 367.28 for 8 hour weekday/saturday booking with 1 hour in Saturday", async () => {
    const result = await bookingHelper.calculateFee(
      "2018-09-14T17:00:00+11:00",
      "2018-09-15T01:00:00+11:00"
    );
    expect(result).to.equal(367.28);
  });
});

describe("Sunday Rate - overlapping with saturday", () => {
  it("should return 486.8 for 8 hour sunday/saturday booking with 1 hour in sunday", async () => {
    const result = await bookingHelper.calculateFee(
      "2018-09-15T17:00:00+11:00",
      "2018-09-16T01:00:00+11:00"
    );
    expect(result).to.equal(486.8);
  });
});
