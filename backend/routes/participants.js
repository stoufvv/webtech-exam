const router = require("express").Router();
const participantsController = require("../controllers/participants");

router.get('/:meeting_id', participantsController.getParticipantsForMeeting);
router.post('/:meeting_id', participantsController.addParticipantToMeeting);
router.put('/:movie_id/participant_id/:id', participantsController.updateParticipant);
router.delete('/movie_id/participant_id/:id', participantsController.removeParticipantFromMeeting);

module.exports = router;