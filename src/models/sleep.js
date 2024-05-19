const mongoose = require("mongoose");

// Schema for new record to be saved on the database
const sleepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hours: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Sleep = mongoose.model("sleep", sleepSchema);

module.exports = Sleep;
