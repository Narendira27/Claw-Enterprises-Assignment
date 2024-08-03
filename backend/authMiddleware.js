const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const AuthMiddleware = async (req, res, next) => {
  const supabaseUrl = process.env.supabaseUrl;
  const supaBaseApi = process.env.supabaseKey;
  const supabase = createClient(supabaseUrl, supaBaseApi);
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json({ msg: "Required Headers Not Found" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.json({ msg: "JWT not found" });
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error) return res.status(400).json({ error: error.message });
  req.email = user.email;
  next();
};

module.exports = AuthMiddleware;
