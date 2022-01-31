const Meeting = require("../models/index").Meeting;
const Participant = require('../models/index').Participant;



// post - create meeting
const createMeeting = async (req, res) => {
  if (
    req.body.description &&
    req.body.url &&
    req.body.date
  ) {
    let meeting = new Meeting(req.body);
    await meeting.save();
    res
      .status(201)
      .send({ message: 'Meeting created', meeting: meeting });
  } else if (typeof req.body.description === "string" && req.body.description.length >= 3) {
    res.status(400).json({ message: "Description should be a string with more than 3 characters" });
  } else {
    res.status(500).send({ message: "Server error." });
  }
};

const getMeetings = async (req, res) => {
  //sends the client the list of meetings
  //paginare
  let pageNo, pageSize;

  if (req.query.pageNo || req.query.pageSize) {
    try {
      pageNo = + req.query.pageNo;
      pageSize = + req.query.pageSize;
      let off = pageNo * pageSize;
      Meeting.findAll({ offset: off, limit: pageSize }).then(data => res.status(200).send(data));
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
  try {
    Meeting.findAll().then(data => res.status(200).send(data));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// get meeting by id with participants
const getMeetingByIdWithDetails = async (req, res) => {
  let meeting_id = req.params.meeting_id;
  let myMeeting;
  try {
    Meeting.findOne({
      where: {
        id: meeting_id,
      },
    }).then(async (result) => {
      if (result) {
        myMeeting = result;
        let participants = await Participant.findAll({
          where: {
            meetingId: meeting_id,
          },
        });

        res.status(200).json({
          myMeeting,
          participants: participants
        });
      } else {
        res.status(404).json({ message: "Meeting not found" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

//put - update meeting
const updateMeeting = async (req, res) => {
  const meeting_id = req.params.meeting_id;
  try {
    let currentMeeting = await Meeting.findOne({ where: { id: meeting_id } });
    if (currentMeeting) {
      let changes = req.body.updatedMeeting;
      await currentMeeting.update(changes);
      res.status(202).json({ message: "Changes accepted" });
    } else {
      res
        .status(404)
        .json({ message: "The meeting you're trying to update doesn't exist" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

//delete meeting
const deleteMeeting = async (req, res) => {
  const meeting_id = req.params.meeting_id;
  try {
    Meeting.findOne({
      where: {
        id: meeting_id,
      },
    }).then((result) => {
      if (result) {
        result.destroy();
        res.status(200).send({
          message: "Meeting deleted",
        });
      } else
        res.status(404).send({
          message: "Could not find meeting",
        });
    });
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getMeetings,
  getMeetingByIdWithDetails,
  deleteMeeting,
  updateMeeting,
  createMeeting
};

