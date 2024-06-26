import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

export default function ContactForm({text,desc}) {
  return (
    <div className='mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-white  text-center text-3xl font-semibold mb-3'>{text}</h1>
        <p className='text-richblack-500 mb-5'>{desc}</p>
        <ContactUsForm/>
    </div>
  )
}
