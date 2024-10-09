const express = require("express");
const router = express.Router();
const { 
  createGroup, 
  myGroups, 
  deleteGroup, 
  editGroup, 
  joinGroup, 
  addMember, 
  deleteMember ,
  getGroup,
  groupMembers,
} = require('../controllers/group.controller');
const { isGroupOwner } = require("../middlewares/isGroupOwner");

router.post('/', createGroup);
router.get('/', myGroups);

router.get('/:id', getGroup);
router.get('/:id/invite', joinGroup);
router.post('/:id/members', addMember);
router.delete('/:id/members', deleteMember);
router.get('/:id/members', groupMembers);
router.put('/:id', editGroup);
router.delete('/:id', isGroupOwner, deleteGroup);


module.exports = router;