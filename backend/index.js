const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const db = require('./models');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || "4000";

app.get("/test", (req, res) => {
  res.send("ok");
});

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