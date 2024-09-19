const db = require("../models");

const createGroup = async (req, res) => { 
  try {
    const { name, description } = req.body;
    const user = req.user;
    const group = await db.Group.create({
      name,
      description,
      ownerId: user.id,
    });

    res.status(201).json({
      status: 'success',
      message: 'Group created successfully',
      data: {
        id: group.id,
        name,
        description,
        inviteLink: `/groups/${group.id}/invite`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const myGroups = async (req, res) => { 
  try {
    const groups = await db.Group.findAll({
      where: {
        ownerId: req.user.id,
      }
    });

    const data = groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      inviteLink: `/groups/${group.id}/invite`,
    }));

    res.status(200).json({
      status: 'success',
      message: 'Groups listed successfully',
      data
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Delete a group by ID

const deleteGroup = async (req, res)=> {
  try{
    const {groupId} = req.params;
    const  user = req.user;
    const group = await db.Group.findOne({
      where: {
        id: groupId,
        ownerId: user.id,
      }
      
    });

    if(!group){
      return res.status(404).json({
        status: 'error',
        message: 'Group not found or you do not have permission to delete it',
      });
    }

    await group.destroy();

    res.status(200).json({
      status: 'success',
      message: "Group deleted successfully",
    });

  }catch(error){
    console.error('Error:', error);

    res.status(500).json({
      status: 'error',
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createGroup,
  myGroups,
  deleteGroup // Export the new deleteGroup function
};