const router = require("express").Router();
const meetingsController = require("../controllers/meetings");

router.get('/', meetingsController.getMeetings);
router.get('/:meeting_id', meetingsController.getMeetingByIdWithDetails);
router.post('/create', meetingsController.createMeeting);
router.put('/:meeting_id/update', meetingsController.updateMeeting);
router.delete('/:meeting_id/delete', meetingsController.deleteMeeting);

module.exports = router;