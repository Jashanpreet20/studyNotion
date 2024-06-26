import React from 'react'

export default function Error() {
  return (
    <section className="bg-richblack-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-white">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 text-white">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <button className="inline-flex text-white bg-blue-400 text-2xl hover:bg-blue-800
             focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
            rounded-lg px-5 py-2.5 text-center  my-4">Home page</button>
        </div>   
    </div>
</section>
  )
}
