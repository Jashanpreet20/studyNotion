const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {passwordUpdated}=require('../mail/template/passwordUpdate');
const mailSender = require("../utils/mailSender");
require("dotenv").config();
// otp

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user registered already can't send otp",
      });
    }

    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("otp generated=", otp);

    // check uniqueness of top
    const result = await OTP.findOne({ otp:otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result ", result);
		while (result) {
			otp = otpgenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);

    console.log("otp body=",otpBody);

    return res
      .status(201)
      .json({ success: true, data: otp, message: "otp send successfually" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "send top failed" });
  }
};

// signup

exports.singUp = async (req, res) => {
  try {
    // data fetch from req ki body se

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    // validate check krlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res
        .status(403)
        .json({ success: false, message: "please enter all input field" });
    }

    // 2 password match krlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "both password not match please try again",
      });
    }
    // user check already exist toh nhi ha
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user is already exist" });
    }

    // find recent otp

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid =",otp
			});
		}

    // hash password

    let hashpassword;
    // securepassword
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
    }

    console.log(hashpassword);
    // create the user
    let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

    // create db entry
    // create profile entry
    const profileData = await Profile.create({
      gender: null,
      dateOfBorth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      approved:approved,
      password: hashpassword,
      confirmPassword: hashpassword,
      accountType:accountType,
      additionalDetails:profileData._id,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}`,
    });

    return res.status(200).json({
      succuess: true,
      data: user,
      message: "user created successfully",
    });

    // return res
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "something went wrong in signup" });
  }
};

//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "required all fields" });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not registered" });
    }

    // generate jwt and check password validation
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        // three days tk cookie rhegi
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "logged in successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "password not match" });
    }
  } catch (error) {
    console.log("something wrong in login", error);
    return res.status({ success: false, message: "login failed" });
  }
};

// change password

exports.changePassword = async (req, res) => {
  try {
    // get user data from req.user
    const userDetails=await User.findOne(req.user.id);

    // fetch data from req body old,new,confirm password
    const { oldpassword, newPassword, confirmNewPassword } = req.body;
    // validation
    const isPasswordMatch= bcrypt.compare(oldpassword,userDetails.password);

    // validate old password
    if(!isPasswordMatch){
      return res
      .status(401)
      .json({ success: false, message: "The password is incorrect" });
  }

    // Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

    // Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

    // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

    // return response
    // Return success response
		return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log("something went wrong in changepassword ", err);
    res.status(400).json({ success: false, message: "change password failed" });
  }
};
