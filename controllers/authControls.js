const userSchema = require("../models/userSchema");
const { badRequest, unauthneticatedError } = require("../errors/");

const register = async (req, res) => {
  userSchema.createIndexes({ username: 1 }); // takes care of duplicate issues
  let newUser = await userSchema.create(req.body);
  if (!newUser) {
    throw error;
    // probably a duplicate error so check the error type and adjust the error msg
  }
  return res.status(201).json({ success: true, message: "account created" });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new badRequest("Please provide username and password");
  }
  const user = await userSchema.findOne({ username: username });
  if (!user) {
    throw new unauthneticatedError("Unauthorized, invalid credentials");
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new unauthneticatedError("Unauthorized, invalid credentials");
  }
  // generate token
  // const token = jwt.sign({userID:user._id, username:user.username},process.env.JWT_SECRET,{expiresIn:'30d'})
  const token = await user.createJWT();
  res.status(200).json({ success: true, message: "login successful", token });
};
module.exports = { register, login };
