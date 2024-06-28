import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

export default function InstructorSection() {
  return (
    <div className="relative flex flex-col  items-center text-white justify-between mx-auto gap-x-2 w-9/12 max-w-maxContent mt-10">
      <div className="flex lg:flex-row my-20 gap-x-10 justify-between">
        {/* image section */}
        <div className="h-fit flex flex-row w-[100%] lg:w-[500px] py-4 shadow-[10px_0px_10px_0px_rgba(255,255,255)]">
          <img src={InstructorImage}  />
        </div>

        {/* text heading button */}
        <div className="flex flex-col gap-x-8 w-[50%] ">
         <div className="flex flex-col gap-y-4 items-start">
         <div className="flex flex-col text-3xl">
            <p className=" font-semibold text-white ">
              Become an</p>
              <span className="text-blue-200 font-bold">Instructor</span>

            </div>

            <div className="text-richblack-200 text-start">
              Instructors from around the world teach millions of students
              on StudyNotion. We provide the tools and skills to teach what
              you love.
            </div>

            <div className="flex items-center justify-center mt-20">
              <CTAButton active={true} linkto={"/signup"}>
               <div className='flex items-center justify-center gap-4'>
               Start Teaching Today
                <FaArrowRight />
               </div>
              </CTAButton>
              
            </div>
         </div>

            
          
        </div>
      </div>
    </div>

  )
}
