const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hours: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Sleep = mongoose.model("sleep", sleepSchema);

module.exports = Sleep;
