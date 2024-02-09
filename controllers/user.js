const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");
const validateRegistrationData = require("../validation/register.js");

const jwtSecretKey = "myjwtsecretkey";

const registarUser = async (req, res) => {
  const err = validateRegistrationData(req.body);
  if (err.hasError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    return res.json({
      success: false,
      message: "User already registered.",
    });
  }

  const planTextPassword = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(planTextPassword, salt);

  userDetails.password = hashedPassword;

  user = new User(userDetails);
  await user.save();
  res.json({
    success: true,
    message: "User registred successfully",
  });
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const planTextPassword = req.body.password;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.json({
      success: false,
      message: "User dose not exists, Please register first",
    });
  }

  const isPasswordValid = await bcrypt.compare(planTextPassword, user.password);

  if (!isPasswordValid) {
    return res.json({
      success: false,
      message: "Incorrect usrename or password",
    });
  }

  const payload = {
    exp: Math.floor(Date.now() / 1000 + 3600),
    email: user.email,
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(payload, jwtSecretKey);

  await User.findByIdAndUpdate(user._id, { token: token });

  res.json({
    success: true,
    token: token,
  });
};

const logoutUser = async (req, res) => {
  const decodedToken = jwt.decode(req.headers.authorization);
  await User.findByIdAndUpdate(decodedToken.id, { token: "" });

  res.json({
    success: true,
    messege: "User logout successful",
  });
};

module.exports = {
  registarUser,
  loginUser,
  logoutUser,
};
