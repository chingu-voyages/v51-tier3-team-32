const db = require('../models');

const isGroupOwner = async (req, res, next) => {
  const userId = req.user.id;
  const groupId = req.params.id;

  const group = await db.Group.findByPk(groupId);

  if (group.ownerId !== userId) {
    return res.status(401).json({ error: "Unauthorized to delete group" });
   }
  
  next();
}

module.exports = {
  isGroupOwner,
};