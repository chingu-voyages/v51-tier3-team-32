const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const { authenticateUser } = require("./src/middlewares/authenticateUser");

app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL, 'google.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));


const PORT = process.env.PORT || "4000";

app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("ok");
});

app.use('/auth', authRoutes);
app.use('/groups', authenticateUser, groupRoutes);


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