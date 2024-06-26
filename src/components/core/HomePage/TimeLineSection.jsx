import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLimeImage from "../../../assets/Images/TimelineImage.png";

const Time = [
  {
    id: 0,
    Logo: logo1,
    Title: "LeaderShip",
    Desc: "Fully committed to the success company",
  },
  {
    id: 1,
    Logo: logo2,
    Title: "Responsibility",
    Desc: "Student will always be our top priority",
  },
  {
    id: 2,
    Logo: logo3,
    Title: "Flexibility",
    Desc: "The ability to switch in an important  skills",
  },
  {
    id: 3,
    Logo: logo4,
    Title: "Solve the problem",
    Desc: "Code your way to a solution",
  },
];

export default function TimeLineSection() {
  return (
    <div className="mx-auto w-9/12 max-w-maxContent gap-5 flex items-center justify-between mt-10">
      <div className="flex text-3xl gap-5 w-[50%] mt-10 mb-8">
        <div className="flex flex-col gap-y-10">
          {/* section 1 */}

          {Time.map((item) => {
            return (
              <div key={item.id} className="flex gap-6">
                <div className="w-[50px] h-[50px]  flex items-center">
                  <img src={item.Logo} />
                </div>

                <div>
                  <p className="font-semibold text-[18px]">{item.Title}</p>
                  <p className="text-base">{item.Desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* section 2 */}
      <div className="flex flex-col gap-5 w-[50%] ">
        <div className=" relative ">
          <img
            src={TimeLimeImage}
            alt="TimeLine Image"
            className="object-cover h-fit "
          />
          <div className="absolute bg-caribbeangreen-700 flex flex-row uppercase text-white py-5 px-5 mx-auto  gap-x-3 w-[70%]
                          left-[40%] translate-x-[-30%] translate-y-[-40%] ">
            <div className="flex flex-row gap-5 items-center border-r-caribbeangreen-300 shadow-[3px_0px_rgba(255,255,255)]">
              
             <p className="font-bold text-3xl">10</p>
              <p className="text-caribbeangreen-25 text-sm"> Years of Experience </p>
            </div>
               
               <div className="flex gap-5 items-center">
               <p className="font-bold text-3xl">250</p>
              <p className="text-caribbeangreen-25 text-sm"> Types of Courses </p>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
}
