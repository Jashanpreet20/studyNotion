import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";
import { FaArrowLeft } from "react-icons/fa";

export default function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(true);
  const [showconfirmPassword,setShowConfirmPassword]=useState(true);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [formdata, setformdata] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formdata;

  function handleChange(e) {
    setformdata((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }

  return (
    <div className="flex flex-col items-center justify-center   mx-auto w-3/12 max-w-maxContent">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="text-white flex flex-col items-start justify-center mt-24 gap-5">
          <h1 className="text-white text-3xl font-bold font-inter">
            Choose new password
          </h1>
          <p className="text-richblack-500">
            Almost done. Enter your new password and youre all set.
          </p>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-4 items-start justify-start"
          >
            <label className="relative">
              <p className="mb-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative">
              <p className="mb-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
               Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showconfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Enter confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showconfirmPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <button
              className="bg-yellow-50 text-black  mt-2 w-full
                text-center text-[16px] px-6 py-3 rounded-lg font-bold transition-all duration-200  hover:scale-95"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <div className="flex gap-4 items-center justify-center cursor-pointer">
            <Link to="/login">
              <FaArrowLeft />
            </Link>
            <Link to="/login">
              <p className="text-white">back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
