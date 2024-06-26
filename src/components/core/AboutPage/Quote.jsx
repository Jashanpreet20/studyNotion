import React from "react";

export default function Quote() {
  return (
    <div className="mt-6 w-[90%] mx-auto text-center leading-10">
      <p className="text-richblack-50 text-3xl font-semibold leading-10 ">
        We are passionate about revolutionizing the way we learn. Our innovative
        platform <span className="text-blue-100"> combines technology</span>
        , <span className="text-yellow-50"> expertise</span>, and community to
        create an
        <span className="text-yellow-50">
          {" "}
          unparalleled educational experience.
        </span>
      </p>
    </div>
  );
}
