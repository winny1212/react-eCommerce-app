import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc    new user registration
//@route   POST/api/users
//@access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  //the user's email is already exist
  if (userExists) {
    res.status(400);
    throw new Error('The email is already registered!');
  }
  //nre user registration
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user!');
  }
});

//@desc    user authentication & access Token
//@route   POST/api/users/login
//@access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  //  if user exist and the password is right, we will get the user info
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc    get the user info when login successfully
//@route   GET/api/users/profile
//@access  private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User is not exist!');
  }
});

//@desc    profile update
//@route   PUT/api/users/profile
//@access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //get the updated infomation
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    //return the new infomation
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('user is not exist');
  }
});

//@desc    get all users
//@route   GET/api/users
//@access  private(for the user who is administrator)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc    delete user from userlist
//@route   DELETE/api/users/:id
//@access  private(for the user who is administrator)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc    get single user info
//@route   GET/api/users/:id
//@access  private(for the user who is administrator)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found !');
  }
});

//@desc    update user info
//@route   PUT/api/users/:id
//@access  private(for the user who is administrator)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  //access the updated info
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updateUser = await user.save();
    //return updated user info
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User is not exist');
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
