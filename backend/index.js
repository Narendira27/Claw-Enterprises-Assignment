const express = require("express");
const { User, Todo, Sessions } = require("./db");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("./authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const supabaseUrl = process.env.supabaseUrl;
const supaBaseApi = process.env.supabaseKey;
const supabase = createClient(supabaseUrl, supaBaseApi);

app.post("/register", async (req, res) => {
  const body = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });
  if (error) return res.status(400).json({ error: error.message });
  try {
    const dbReq = await User.create({ email: body.email });
    return res.json({ jwt: data.session.access_token });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });
  if (error) return res.status(400).json({ error: error.message });
  try {
    const dbReq = await Sessions.create({
      email: body.email,
      jwtToken: data.session.access_token,
      loginTime: Math.floor(Date.now() / 1000),
      IpAddress: req.ip,
    });
    return res.json({ jwt: data.session.access_token });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

app.post("/logout", async (req, res) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.json({ msg: "No Headers" });
  }
  const token = headers.split(" ")[1];
  if (!token) {
    return res.json({ msg: "jwt not found" });
  }
  try {
    const dbReq = await Sessions.updateOne(
      { jwtToken: token },
      { logoutTime: Math.floor(Date.now() / 1000) }
    );
    return res.json({ msg: "done" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

app.post("/todos", AuthMiddleware, async (req, res) => {
  const body = req.body;
  try {
    const dbReq = await Todo.create({
      title: body.title,
      email: req.email,
    });
    return res.json({ msg: "Done" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

app.get("/todos", AuthMiddleware, async (req, res) => {
  try {
    const dbReq = await Todo.find({ email: req.email });
    return res.json({ data: dbReq });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

app.put("/todos/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const dbReq = await Todo.updateOne(
      { _id: id },
      { title: body.title, IsDone: body.IsDone }
    );
    if (dbReq.modifiedCount === 0) {
      return res.status(400).json({ msg: "Id Not Found" });
    }
    return res.json({ msg: "Done" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

app.delete("/todos/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const dbReq = await Todo.deleteOne({ _id: id });
    if (dbReq.deletedCount === 0) {
      return res.status(400).json({ msg: "Id Not Found" });
    }
    return res.json({ msg: "Done" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

app.get("/sessions", AuthMiddleware, async (req, res) => {
  const dbReq = await Sessions.find({ email: req.email });
  try {
    const sessionLog = dbReq.map((each) => ({
      Email: each.email,
      IpAddress: each.IpAddress,
      LoginTime: each.loginTime,
      LogoutTime: each.logoutTime || "",
    }));
    return res.json({ sessions: [...sessionLog] });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

app.listen(54321, () => {
  console.log("Server Started");
});
