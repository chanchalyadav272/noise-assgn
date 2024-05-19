const express = require("express");
const sleepController = require("../controllers/sleepController");

const router = express.Router();

router.post("/", sleepController.createSleep);
router.get("/:userId", sleepController.getSleepByUser);
router.delete("/:recordId", sleepController.deleteSleepByID);

module.exports = router;
