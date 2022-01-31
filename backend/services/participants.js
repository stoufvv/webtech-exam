const { Participant } = require("../models");

const getParticipantsById = async (meeting_id) => {
    let participants = await Participant.findAll({
        where: { meetingId: meeting_id },
    }
    );
    return participants;
};

module.exports = { getParticipantsById };