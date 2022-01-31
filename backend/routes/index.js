const express = require("express");
const router = express.Router();
const meetingsRouter = require("./meetings");
const participantsRouter = require("./participants");

router.use("/meetings", meetingsRouter);
router.use("/participants", participantsRouter);

module.exports = router;