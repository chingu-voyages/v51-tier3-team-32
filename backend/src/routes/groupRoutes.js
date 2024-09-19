const express = require("express");
const router = express.Router();
const { createGroup, myGroups } = require('../controllers/group.controller');

router.post('/', createGroup);
router.get('/', myGroups);
router.delete('/groups/:groupId', deleteGroup);

module.exports = router;