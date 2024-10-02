module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Group name already exist.",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  });

  Group.associate = (models) => {
    Group.belongsTo(models.User, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE',
    });

    Group.belongsToMany(models.User, {through: 'GroupUser'});
  }

  return Group;
};


