const Sleep = require("../models/sleep");


// function to save new sleep records in database
const createSleep = async (req, res) => {
  try {
    const newSleep = new Sleep(req.body);
    await newSleep.save();
    res.status(200).send({ Added: newSleep });
  } catch (error) {
    // console.error(error);
    res.status(400).send({ success: false, message: error });
  }
};

// function to retrieve saved sleep records of specific user from database
const getSleepByUser = async (req, res) => {
  const filter = { userId: req.params.userId };
  try {
    const sleeps = await Sleep.find(filter).sort({ timestamp: -1 });
    res.status(200).send({ User: req.params.userId, SleepRecords: sleeps });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

// function to delete specific sleep record from database
const deleteSleepByID = async (req, res) => {
  const filter = req.params.recordId;
  try {
    const sleep = await Sleep.findByIdAndDelete(filter);

    if (!sleep) {
      return res
        .status(404)
        .send({ success: false, message: "Record not found" });
    }
    res.status(200).send({ Deleted: sleep });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

module.exports = { createSleep, getSleepByUser, deleteSleepByID };
