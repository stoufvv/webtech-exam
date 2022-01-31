module.exports = (sequelize, DataTypes) => {
  return sequelize.define("meetings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    date: DataTypes.DATEONLY
  });
};