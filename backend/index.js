import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || "4000";

app.get("/test", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})

