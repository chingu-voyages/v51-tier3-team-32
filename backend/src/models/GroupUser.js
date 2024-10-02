module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  GroupUser.associate = (models) => {
    GroupUser.hasMany(models.User, {
      foreignKey: 'userId',
    });

    GroupUser.hasMany(models.Group, {
      foreignKey: 'groupId',
    });
  }

  return Group;
};


