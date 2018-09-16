"use strict";
//requires
const jsonFile = require("jsonfile");

//a service to async read and write input and output json files.
module.exports = {
  readInput: async filePath => {
    try {
      const bookings = await jsonFile.readFile(filePath);
      return bookings;
    } catch (ex) {
      throw ex;
    }
  },
  writeOutput: async (filePath, data) => {
    try {
      return await jsonFile.writeFile(filePath, data);
    } catch (err) {
      throw error;
    }
  }
};
