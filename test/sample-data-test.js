const expect = require("chai").expect;
const feeHandler = require("../handlers/fee-handler");
const sampleInput = require("./sample/input");
const sampleOutput = require("./sample/output");

describe("Overall Test - The sample input should produce sample output", () => {
  it("should return sample output JSON object when passed sample input JSON object", async () => {
    const result = await feeHandler.calculateBookingFee(sampleInput);
    expect(result).to.deep.equal(sampleOutput);
  });
});