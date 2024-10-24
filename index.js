import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./Database/datbase.js";
import "dotenv/config";
import DataRoute from "./Routes/DataRoute.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(express.json());

connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
  app.listen(5000, () => {
    console.log(`app listen port number ${5000}...!`);
  });
});

app.get("/", (req, res) => {
  res.json("hellow wordl");
});

app.use("/data", DataRoute);
