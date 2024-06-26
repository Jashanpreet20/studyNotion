import React from "react";
import CTAButton from "./CTAButton";
import HighLightText from "./HighLightText";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
export default function CodeBlocks({
  position,
  heading,
  subHeading,
  ctnbtn1,
  ctnbtn2,
  codeblock,
  backGroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 gap-x-10 justify-between`}>
      {/* section  1 */}
      <div className="flex flex-col gap-x-8 gap-y-5 w-[50%]">
        {heading}
        <div className="text-richblack-200 text-start ">{subHeading}</div>

        <div className="flex gap-7 mt-12">
          <CTAButton active={ctnbtn1.active} linkto={ctnbtn1.value}>
            <div className="flex gap-2 items-center">
              {ctnbtn1.btntext}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctnbtn2.active} linkto={ctnbtn2.value}>
              {ctnbtn2.btntext}
          </CTAButton>
        </div>

         
      </div>

      {/* section 2 */}
        <div className="from-blue-800 bg-gradient-to-r">
        <div className="h-fit flex flex-row w-[100%] lg:w-[500px] py-4 ">
            <div className="text-center flex flex-col w-[10%] text-richblack-400 font-bold font-inter 
           ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} pr-2 `}>
            <TypeAnimation sequence={[codeblock,5000,""]}
                            repeat={Infinity} cursor={true} omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace:"pre-line",
                                    display:"block",                            
                                }
                            }
                             >

            </TypeAnimation>
            </div>
        </div>

        </div>
    </div>
  );
}
