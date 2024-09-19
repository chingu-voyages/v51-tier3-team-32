const express = require("express");
const router = express.Router();
const { createGroup, myGroups, deleteGroup } = require('../controllers/group.controller');
const { isGroupOwner } = require("../middlewares/isGroupOwner");

router.post('/', createGroup);
router.get('/', myGroups);
router.delete('/:id', isGroupOwner, deleteGroup);

module.exports = router;