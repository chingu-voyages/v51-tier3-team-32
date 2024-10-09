const { where } = require("sequelize");
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

    await group.addUsers(user);

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

const joinGroup = async (req, res) => { 
  try {
    const user = req.user;
    const group = await db.Group.findOne({where: { id: req.params.id}});

    await group.addUsers(user);

    res.status(200).json({message: "Group member joined successfully"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const addMember = async (req, res) => { 
  try {
    const user = await db.User.findOne({where: { email: req.body.email}});
    const group = await db.Group.findOne({where: { id: req.params.id}});

    await group.addUsers(user);

    res.status(200).json({message: "Group member added successfully"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const deleteMember = async (req, res) => { 
  try {
    const user = await db.User.findOne({where: { email: req.body.email}});
    const group = await db.Group.findOne({where: { id: req.params.id}});
    await group.removeUsers(user);

    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const groupMembers = async (req, res) => { 
  let members;

  try {
    const group = await db.Group.findOne({where: { id: req.params.id}});
    if (group) {
      members = await group.getUsers();
    }

    res.status(200).send(members || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const getGroup = async (req, res) => {

  const groupId = req.params.id;
  try {
    const group = await db.Group.findOne({
      where: {
        id: groupId
      }
    });

    res.status(200).send(group);
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
  deleteGroup,
  editGroup,
  joinGroup,
  addMember,
  deleteMember,
  getGroup,
  groupMembers,
};
