const express = require("express");
const router = express.Router();
const { 
  createGroup, 
  myGroups, 
  deleteGroup, 
  editGroup, 
  joinGroup, 
  addMember, 
  deleteMember 
} = require('../controllers/group.controller');
const { isGroupOwner } = require("../middlewares/isGroupOwner");

router.post('/', createGroup);
router.get('/', myGroups);

router.post('/:id/invite', joinGroup);
router.post('/:id/members', addMember);
router.delete('/:id/members', deleteMember);
router.put('/:id', editGroup);
router.delete('/:id', isGroupOwner, deleteGroup);


module.exports = router;