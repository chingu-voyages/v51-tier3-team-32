const express = require("express");
const router = express.Router();
const { oauthGoogle, oauthGoogleCallback, getAuthToken } = require('../controllers/oauth.controller');

router.get('/google', oauthGoogle);
router.get('/google/callback', oauthGoogleCallback);
router.get('/token', getAuthToken);

module.exports = router;