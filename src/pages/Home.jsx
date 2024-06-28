import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import Footer from '../components/Common/Footer'
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSlider from "../components/Common/ReviewSlider";

export default function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative flex flex-col z-1 items-center text-white justify-between mx-auto gap-x-2 w-11/12 max-w-maxContent">
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1  mx-auto rounded-full bg-richblue-800 font-bold shadow-md shadow-blue-5
        text-white transition-all duration-200 hover:scale-95"
          >
            <div
              className="flex items-center justify-center gap-x-4 px-10 py-[5px] rounded-full 
          transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
        </Link>

        {/* heading */}
        <div className="text-center font-semibold text-4xl mt-7">
          Empower Your Future with
          <HighLightText text={"  Coding Skills"} />
        </div>
        {/* sub-heading */}
        <div className="text-richblack-200 mt-4 w-[70%] text-center">
          <p>
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>
        {/* 2 button chahiye call to action */}
        <div className=" flex gap-x-7 mt-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* video add krni hai */}
        <div className=" mx-3 my-10 w-[70%] shadow-[10px_10px_0px_0px_rgba(255,255,255)]">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="w-[80%]">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-3xl font-semibold">
                Unlock your <HighLightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subHeading={
              <div>
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </div>
            }
            ctnbtn1={{
              btntext: "Try it Yourself",
              value: "/signup",
              active: true,
            }}
            ctnbtn2={{
              btntext: "Learn More",
              value: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
            <html>
            head><title>Example>
            </title><linkrel=stylesheethref=styles.css>
            /head>
            <body>
            h1><ahref="/">Header</a>
            <h1>
            nav><ahref="one/">One</a><ahref="two/">
           <Two</a><ahref="three/">Three</a>
           </nav>`}
            codeColor={"text-pink-100"}
          ></CodeBlocks>
        </div>
        {/* code section 2 */}
        <div className="w-[80%] ">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-3xl font-semibold flex flex-col">
                <div>
                  {" "}
                  Start <HighLightText text={" Coding "}></HighLightText>
                  <div>
                    {" "}
                    <HighLightText text={" in Seconds "}></HighLightText>
                  </div>
                </div>
              </div>
            }
            subHeading={
              <div>
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </div>
            }
            ctnbtn1={{
              btntext: "Continue Lesson",
              value: "/signup",
              active: true,
            }}
            ctnbtn2={{
              btntext: "Learn More",
              value: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
            <html>
            head><title>Example>
             </title><linkrel="stylesheet"href="styles.css">
            /head>
            <body>
            h1><ahref="/">Header</a>
            <h1>
            nav><ahref="one/">One</a><ahref="two/">
           <Two</a><ahref="three/">Three</a>
           </nav>`}
            codeColor={"text-yellow-25"}
          ></CodeBlocks>
        </div>
        <ExploreMore/>  
      </div>

      {/* section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            {/* // button ki div */}
            <div className="h-[150px]"></div>
            <div className="flex gap-7 text-white items-center ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-x-3 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-9/12 max-w-maxContent gap-5 flex items-center justify-between mt-10">
          <div className="flex text-3xl text-black font-semibold gap-5 w-[45%] mt-10 mb-8">
            <div>
              Get the skills you need for a
              <HighLightText text={" job that is in demand."} />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-[50%] items-start">
            <p className="text-[16px]">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>

        <TimeLineSection />
        <LearningLanguageSection />
      </div>

      {/* section 3 */}

        <InstructorSection/>
      <h2 className="text-center text-white mt-10 text-4xl font-semibold">Review from other learners</h2>
      {/* section 4 */}
      <ReviewSlider/>

      <div><Footer/></div>
    </div>
  );
}
