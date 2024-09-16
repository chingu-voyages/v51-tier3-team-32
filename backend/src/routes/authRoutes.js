const express = require("express");
const router = express.Router();
const { oauthGoogle, oauthGoogleCallback } = require('../controllers/auth/oauth.controller');

router.get('/google', oauthGoogle);
router.get('/google/callback', oauthGoogleCallback);

module.exports = router;