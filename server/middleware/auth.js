const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    // fetch token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token is missing" });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      console.log("something went wrong in auth middleware", error);
      return res
        .status(400)
        .json({ success: false, message: "authentication is not valid" });
    }
    next();
  } catch (err) {
    console.log("something went wrong in auth middleware", err);
    return res
      .status(400)
      .json({ success: false, message: "authentication failed"  });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for student",
      });
    }
    next();
  } catch (error) {
    console.log("something went wrong in Studnet middleware", err);
    return res
      .status(400)
      .json({ success: false, message: "Studnet auth  failed" });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    console.log("something went wrong in Instructor middleware", err);
    return res
      .status(400)
      .json({ success: false, message: "Instructor auth failed" });
  }
};


exports.isAdmin=async(req,res,next) =>{
    try {
        if (req.user.accountType !== "Admin") {
          return res.status(401).json({
            success: false,
            message: "this is a protected route for Admin",
          });
        }
        next();
      } catch (error) {
        console.log("something went wrong in Admin middleware", err);
        return res
          .status(400)
          .json({ success: false, message: "Admin auth failed" });
      }
}