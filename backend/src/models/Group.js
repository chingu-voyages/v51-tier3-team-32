const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.UUID), // Array to store user IDs
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  // Define associations here if needed
  // Group.associate = function(models) {
  //   Group.belongsTo(models.User, { foreignKey: 'userId' });
  // };

  return Group;
};
