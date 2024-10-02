module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  });

  return Group;
};


