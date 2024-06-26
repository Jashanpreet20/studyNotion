import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import Banner1 from "../assets/Images/aboutus1.webp";
import Banner2 from "../assets/Images/aboutus2.webp";
import Banner3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import Foundingstory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/Common/Footer";
import ReviewSlider from "../components/Common/ReviewSlider";

export default function About() {
  return (
    <div>
      <div className="flex flex-col gap-5 max-w-maxContent items-center justify-center mx-auto w-9/12">
        {/* section 1 */}

        <div className=" flex w-full items-center justify-center flex-col">
          <h5 className="text-richblack-500 mt-10">About us</h5>
          <header className="text-white mt-6 text-3xl font-semibold ">
            Driving Innovation in Online Education for a <br />
            <div className="text-center mt-2">
              <HighLightText text="Brighter future" />
            </div>
          </header>
          <div className="text-richblack-200 mt-4 w-[70%] text-center">
            <p>
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a <br />
              brighter future by offering cutting-edge courses, leveraging
              emerging technologies, and nurturing a <br /> vibrant learning
              community.
            </p>
          </div>

          <div className="xl:flex gap-x-4 mx-auto mt-10 ">
            <img src={Banner1} />
            <img src={Banner2} />
            <img src={Banner3} />
          </div>
        </div>

        {/* section 2 */}

        <div>
          <Quote />
        </div>

        {/* section 3 */}

        <div>
          <div>
            {/* para and image */}
            <div className="flex gap-5 mt-24 items-start justify-between mx-auto">
              <div className="flex flex-col gap-x-10 w-[45%]  text-white">
                <h1 className="text-pink-200 text-3xl font-semibold">
                  Our Founding Story
                </h1>
                <p className="text-richblack-500 mt-4 ">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
                <p className="text-richblack-500 mt-4">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>
              <img src={Foundingstory} />
            </div>
            <div className="flex gap-5 mt-10 items-start justify-between mx-auto">
              <div className="flex flex-col gap-x-10 w-[45%] ">
                <h1 className="text-yellow-200 text-3xl font-semibold">
                  Our Vision
                </h1>
                <p className="text-richblack-500 mt-4">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>
              <div className="flex flex-col gap-x-10 w-[45%] ">
                <h1 className="text-caribbeangreen-200  text-3xl font-semibold">
                  Our Mission
                </h1>
                <p className="text-richblack-500 mt-4">
                  our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* section 4 */}

        <Stats />

        {/* section 5 */}
        <section className="mx-auto flex flex-col items-center justify-between gap-4 ">
          <LearningGrid />
          <ContactForm
            text="Get in Touch"
            desc="We’d love to here for you, Please fill out this form."
          />
        </section>
         
      </div>

      <div>
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl text-white font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider/>
      </div>
      <Footer />  
    </div>
  );
}
