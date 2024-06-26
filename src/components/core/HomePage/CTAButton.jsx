import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({children,active,linkto}) {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[16px] px-6 py-3 rounded-lg font-bold transition-all duration-200  hover:scale-95
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white shadow-[4px_4px_0px_0px_rgba(109,40,217)]"}`}>{children}</div>
    </Link>
  )
}
