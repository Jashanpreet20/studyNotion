import React from "react"

import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactDetails from "../components/core/ContactPage/contactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div>
        {/* Reviws from Other Learner */}
        <h1 className="text-center flex flex-col items-center text-4xl text-white font-semibold mt-8">
          Reviews from other learners
        </h1>
       <div>
       <ReviewSlider/>
       </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
