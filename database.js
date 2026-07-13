import e from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
mongoose.connect(config.db.uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});

connection.on("disconnected", (error) => {
  console.log("Disconnected" + error);
});

connection.on("error", (error) => {
  console.log("error" + error);
});
