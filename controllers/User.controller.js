const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Route          /register
 * Description    Register New User
 * Access         PUBLIC
 * parameter      NONE
 * Method         POST
 */

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check whether all fields are filled or Not
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "Failed",
        error: "Please Enter all Fields",
      });
    }

    //Check if User exists or not
    const existingUser = await UserModel.findOne({ email }); //{ email: email }LHS = UserModel,RHS = req.body
    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        error: "User Already Exists",
      });
    }

    //Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "Success",
      data: {
        email: newUser.email,
        username: newUser.username,
        id: newUser._id,
      },
      token: generateToken(newUser),
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

/**
 * Route          /login
 * Description    Login User
 * Access         Public
 * Parameter
 * Method         POST
 */

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        error: "Please Enter all Fields",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: "Failed",
        error: "User Does Not Exist",
      });
    }

    //Check whether User is Authenticated or Not
    const isMatch = await bcryptjs.compare(password, existingUser.password);

    if (existingUser && isMatch) {
      res.status(200).json({
        status: "Success",
        data: {
          email: existingUser.email,
          username: existingUser.username,
          _id: existingUser._id,
        },
        token: generateToken(existingUser),
      });
    } else {
      return res.status(400).json({
        status: "Failed",
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Token Generation
const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      username: user.username,
      id: user._id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "10d",
    }
  );
};

module.exports = { userRegister, userLogin };
