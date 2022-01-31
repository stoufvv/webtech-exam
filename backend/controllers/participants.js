const Participant = require("../models/index").Participant;
const getParticipantsById = require("../services/participants")
  .getParticipantsById;

const addParticipantToMeeting = async (req, res) => {
  let meeting_id = req.params.meeting_id;
  try {
    let newParticipant = new Participant(req.body);
    newParticipant.meetingId = meeting_id;
    await newParticipant.save();
    res.status(201).json({ message: "Participant added", Participant: newParticipant });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const getParticipantsForMeeting = async (req, res) => {
  let meeting_id = req.params.meeting_id;
  let participants = await getParticipantsById(meeting_id);
  if (participants.length > 0) {
    res.status(200).json(participants);
  } else res.status(404).json({ message: "Not found" });
};

const updateParticipant = async (req, res) => {
  const participant_id = req.params.participant_id;
  try {
    let currentParticipant = await Participant.findOne({
      where: { id: participant_id },
    });
    if (currentParticipant) {
      let changes = req.body;
      await currentParticipant.update(changes);
      res.status(202).json({ message: "Changes accepted" });
    } else {
      res.status(404).json({
        message: "The participant you're trying to update doesn't exist",
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeParticipantFromMeeting = async (req, res) => {
  let participant_id = req.params.participant_id;

  Participant.findOne({
    where: {
      id: participant_id,
    },
  }).then((result) => {
    if (result) {
      result.destroy();
      res.status(200).send({
        message: "Participant deleted!",
      });
    } else
      res.status(404).send({
        message: "Could not find participant!",
      });
  });
};

module.exports = {
  getParticipantsForMeeting,
  updateParticipant,
  removeParticipantFromMeeting,
  addParticipantToMeeting
};