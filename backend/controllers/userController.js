const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

// User Register
exports.register = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatarForShopCorner",
    width: 150,
    crop: "scale",
  });
  console.log(myCloud.public_id);
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: myCloud.secure_url,
    public_id: myCloud.public_id,
  });


  sendToken(user, 201, res);
});

// User Login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }
  console.log(req.user)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get All User Email
exports.getAllUsersEmail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find()

  const allEmail=[]
  for (let i = 0; i < user.length; i++) {
    let userEmail={
      label:user[i].email,
      value:user[i].email
    }
    allEmail.push(userEmail)
  }

  res.status(200).json({
    success: true,
    allEmail,
  });
});

