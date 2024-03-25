import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
// get Userprofile
const getUserProfile = async (req, res) => {
  // we will fetch user profiles either with username or userId
  const { query } = req.params;
  try {
    let user;
    // query is userid
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select('-password')
        .select('-updatedAt');
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select('-password')
        .select('-password');
    }
    if (!user) return res.status(404).json({ error: 'User Not Found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in getUserProfile: ', error.message);
  }
};

// signup
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ1MmMwMTQ0ZjM4ZTg3Y2E3YTIyOTYiLCJpYXQiOjE3MDg0NjkyNTAsImV4cCI6MTcwOTc2NTI1MH0.eGQvwlqMbomt0lK7T7d7-AyedzjU1aEd0R0aQJ-lHtU
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in signupUser', error.message);
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );
    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid usernmae or password' });
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in loginUser: ', error.message);
  }
};

// logout
const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'User Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in signupUser', error.message);
  }
};

// follow and unfollow user
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    // the id is come from the params which i want to follow and modify
    const userToModify = await User.findById(id);
    // the current i which i want to follow some id when clocked the id is goes to params
    const currentUser = await User.findById(req.user._id);
    // console.log(typeof req.user._id);
    //object
    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: 'You cannot follow/unfollow yourself' });
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: 'User Not Found' });
    //
    const isFollowing = currentUser.following.includes(id);
    // id comes from the params the user i want to follow
    if (isFollowing) {
      // Unfollow User
      // Modify current user following anf modify the followers of userToModify
      // req.user._id comes from the current user and i want to pullout the id
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: 'User followed successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in followingUnfollowing', error.message);
  }
};

// updateUser
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });
    // we shouldnt able to change the user
    if (req.params.id !== userId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (profilePic) {
      if (user.profilePic) {
        // destroy the profilePic first from the cloudinary
        await cloudinary.uploader.destroy(
          user.profilePic.split('/').pop().split('.')[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in updateUser: ', error.message);
  }
};
export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
