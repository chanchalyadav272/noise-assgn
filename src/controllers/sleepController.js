const Sleep = require("../models/sleep");

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

const getSleepByUser = async (req, res) => {
  const filter = { userId: req.params.userId };
  try {
    const sleeps = await Sleep.find(filter).sort({ timestamp: -1 });
    res.status(200).send({ User: req.params.userId, SleepRecords: sleeps });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

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
