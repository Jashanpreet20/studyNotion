import React from 'react'
import HighLightText from './HighLightText'
import CTAButton from './CTAButton'
import KnowYourProgess from '../../../assets/Images/Know_your_progress.png';
import ComapreWithOthers from '../../../assets/Images/Compare_with_others.png';
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.png';

export default function LearningLanguageSection() {
  return (
    <div className="relative flex flex-col  items-center text-white justify-between mx-auto gap-x-2 w-11/12 max-w-maxContent mt-10">
       <div className="text-center font-semibold text-black text-4xl mt-7">
       Your swiss knife for 
          <HighLightText text={"  learning any language"} />
        </div>
        {/* sub-heading */}
        <div className="text-richblack-200 mt-4 w-[70%] text-center">
          <p>
          Using spin making learning multiple languages easy. 
          with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </p>
        </div>
      <div className="flex mt-5 items-center justify-center">
      <img className='object-contain -mr-32' src={KnowYourProgess}  />
      <img src={ComapreWithOthers}  />
      <img src={PlanYourLessons}  className='object-contain -ml-32'/>
      </div>

        <div className='mt-10 mb-10'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
      
    </div>
  )
}
