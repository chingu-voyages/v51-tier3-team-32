const axios = require('axios');
const { createUser } = require('../services/createUser');
const db = require('../models');
const { generateToken } = require('../config/jwt');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5001/auth/google/callback';

const oauthGoogle = async (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
}

const oauthGoogleCallback = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    const {token} = await createUser(profile?.email, profile?.name);
  
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None" });
    // redirect to home page with token
    // set cookie with token

    res.redirect(process.env.NODE_ENV === "production" ? 'https://funshare.vercel.app/' : 'http://localhost:3000/');
  } catch (error) {
    console.error('Error:', error);
    res.redirect('http://localhost:3000/login');
  }
}

// Logout function
const logout = async (req, res) => {
  try {
    // Clear cookies or client-side tokens
    res.clearCookie('token'); // Clear the token cookie (if using cookies)
    
    // Optionally, send a message to the client to remove tokens stored in local storage
    res.status(200).json({ message: 'Hey, You Logged out successfully. we are sad to see you go' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'opps, Logout failed' });
  }
}


const getAuthToken = async (req, res) => {
  try {
     user = await db.User.findOne({
      where: { email: req.body.email }
    });

    const token = generateToken(user.email);

    res.status(200).send({ user, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  oauthGoogle,
  oauthGoogleCallback,
  logout,
  getAuthToken,
}
