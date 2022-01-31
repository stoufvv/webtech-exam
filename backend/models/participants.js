module.exports = (sequelize, DataTypes) => {
  return sequelize.define("participants", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING
  });
};