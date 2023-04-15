const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const User = require("../model/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json("Please field all the fields");
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("Invalid Credential");

      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      !validatePassword && res.status(400).json("Invalid Credintial");

      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
