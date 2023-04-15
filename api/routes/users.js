const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findById } = require("../model/User");
const dotenv = require("dotenv").config();
const User = require("../model/User");

// Update the single user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("user has been updated");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

// Delete the single user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted successfully...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can Delete only your account");
  }
});

// Get the single user
// if write "/users?userId=23424234234" then call the userId get method
// if write "/users?username=hery" then call lthe username get method
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get the friends of the user
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Follow the single user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!followedUser.followers.includes(currentUser.id)) {
        await followedUser.updateOne({ $push: { followers: currentUser.id } });
        await currentUser.updateOne({ $push: { followings: followedUser.id } });
        res.status(200).json("User followd successfully...");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow you self");
  }
});

// UNFollow the single user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (followedUser.followers.includes(currentUser.id)) {
        console.log("inside if");
        await followedUser.updateOne({ $pull: { followers: currentUser.id } });
        await currentUser.updateOne({ $pull: { followings: followedUser.id } });
        res.status(200).json("User unfollow successfully...");
      } else {
        res.status(403).json("You had not follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't unfollow you self");
  }
});

module.exports = router;
