const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

require("dotenv").config();

const dbUrl = process.env.db_url;

mongoose.connect(dbUrl);

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
});

const SessionsSchema = new Schema({
  email: { type: String, required: true },
  jwtToken: { type: String, required: true },
  loginTime: { type: String, required: true },
  logoutTime: { type: String },
  IpAddress: { type: String, required: true },
});

const TodoSchema = new Schema({
  title: { type: String, required: true },
  IsDone: { type: Boolean, default: false },
  email: { type: String, required: true },
});

const User = model("User", UserSchema);
const Todo = model("Todo", TodoSchema);
const Sessions = model("Sessions", SessionsSchema);

module.exports = { User, Todo, Sessions };
