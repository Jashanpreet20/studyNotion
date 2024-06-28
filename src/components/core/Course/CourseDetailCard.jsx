import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/CartSlice";
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
export default function CourseDetailCard({
  course,
  setconfirmationmodal,
  handleBuyCourse,
}) {
  const { thumbnail: thumbnailImage, price: currentPrice } = course;

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function handleAddToCart() {
    
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("you are an instructor,you cant't by course");
      return;
    }

    
    if (token) {
      dispatch(addToCart(course));
      navigate('/dashboard/cart');
      return;
    }

    setconfirmationmodal({
      text1: "you are not logged in",
      text2: "Please login to add course to cart",
      btn1Text: "login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setconfirmationmodal(null),
    });
  }

  function handleClickShare() {
    <CopyToClipboard text={window.location.href}></CopyToClipboard>;
    toast.success("copy to clipboard");
  }
  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={thumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {currentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold
               text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
               transition-all duration-200 hover:scale-95 hover:shadow-none"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="rounded-md bg-black-50 px-6 py-3 text-center text-[20px] font-bold
               text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
               transition-all duration-200 hover:scale-95 hover:shadow-none">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <ul>
                      <li>{item}</li>
                    </ul>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleClickShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </> 
  );
}
