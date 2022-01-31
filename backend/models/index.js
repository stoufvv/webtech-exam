const sequelize = require("./db.js");
const Meeting = sequelize.import("./meetings.js");
const Participant = sequelize.import("./participants.js");

Meeting.hasMany(Participant);

sequelize.sync().then(() => {
  console.log("Database & tables ok");
});

module.exports = {
  sequelize,
  Meeting,
  Participant
};