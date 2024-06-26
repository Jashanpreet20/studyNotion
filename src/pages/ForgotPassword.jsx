import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";
import { FaArrowLeft } from "react-icons/fa6";
export default function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);

  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  function handleSumbit(e) {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSend));
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-3/12 max-w-maxContent">
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="text-white flex flex-col items-start justify-center mt-24 gap-5">
          <h1 className="text-white text-3xl font-bold font-inter">
            {!emailSend ? "Reset your Password" : "Check Email"}
          </h1>
          <p className="text-richblack-500">
            {!emailSend
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to  ${email}`}
          </p>

          <form onSubmit={handleSumbit}>
            {!emailSend && (
              <div className="flex flex-col gap-4 items-start justify-start">
                <label> Email-Address <sup className="text-pink-200 ">*</sup></label>
                <input  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                  type="email"
                  placeholder="enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>
            )}

            {!emailSend ? (
              <button
                className="bg-yellow-50 text-black mt-3 w-full
              text-center text-[16px] px-6 py-3 rounded-lg font-bold transition-all duration-200  hover:scale-95"
              >
                Reset password
              </button>
            ) : (
              <div>
                <button onSubmit={handleSumbit}
                  className="bg-yellow-50 text-black 
                text-center text-[16px] px-6 py-3 rounded-lg font-bold transition-all duration-200  hover:scale-95"
                >
                  Resend Email
                </button>
              </div>
            )}
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
