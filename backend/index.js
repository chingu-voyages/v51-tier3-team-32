const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const db = require('./src/models');
const { oauthGoogle, oauthGoogleCallback } = require("./src/controllers/auth/oauth.controller");


app.use(express.json());
app.use(cors());



const PORT = process.env.PORT || "4000";

app.get("/test", (req, res) => {
  res.send("ok");
});

app.get('/auth/google', oauthGoogle);
app.get('/auth/google/callback', oauthGoogleCallback);
// subsequent requests will require jwt token


db.sequelize.sync().then(() => {
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to Funshare API',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});