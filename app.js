"use strict";

//set up the logger
global.logger = require("./helpers/logger");

//project references
const jsonService = require("./services/json-service");
const feeHandler = require("./handlers/fee-handler");

//file path constants
//expecting input.json in input folder
//will write output.json in output folder
const inputFilePath = __dirname + "/input/input.json";
const outputFilePath = __dirname + "/output/output.json";

//wrapping the start of the app in an async function so we can utilise async/await
const serviceStart = async () => {
  try {
    logger.info("app started ...");

    logger.info("Reading input file..");
    const bookings = await jsonService.readInput(inputFilePath);

    logger.info("Calculating fee..");
    const bookingFees = feeHandler.calculateBookingFee(bookings);

    logger.info("Writing output file..");
    await jsonService.writeOutput(outputFilePath, bookingFees);
  } catch (ex) {
    logger.error("Exception!!");
    logger.error(ex.toString());
  }
};

//starting the main async function
serviceStart();
