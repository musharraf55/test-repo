const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signup = async (req, res) => {
  const { name, email, password, token } = req.body;
  try {
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ Message: "User already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const insert = await userModel({
      email: email,
      password: hashPassword,
      name: name,
    }).save();

    const token = jwt.sign(
      {
        email: insert.email,
        id: insert._id,
        token: crypto.randomBytes(32).toString("hex"),
      },
      process.env.SECRET_KEY
    );
    res.status(201).json({ user: insert, token: token });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUsers = await userModel.findOne({ email: email });
    if (!existUsers) {
      res.status(404).json({ Message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existUsers.password);
    if (!matchPassword) {
      res.status(404).json({ Message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existUsers.email,
        id: existUsers._id,
        token: crypto.randomBytes(32).toString("hex"),
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ user: existUsers, token: token });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
};

module.exports = { signup, login };
