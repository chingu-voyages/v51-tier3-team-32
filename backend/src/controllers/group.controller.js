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

const deleteGroup = async (req, res) => { 
  try {
    await db.Group.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};


const editGroup = async (req, res) => { 
  const updatedData = req.body;
  const id = req.params.id;

  try {
    await db.Group.update(updatedData, {
      where: {
        id: id  
      }
    })

    res.status(200).json({message: "Group successfully updated"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};



module.exports = {
  createGroup,
  myGroups,

  deleteGroup, // Export the new deleteGroup function

  editGroup

};