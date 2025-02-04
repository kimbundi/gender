import React from 'react'
import Navbar from '../../usersection/Navbar'
import Hero from '../../usersection/Hero'
import Companies from '../../usersection/Companies'
import Testimonial from '../../usersection/Testimonial'
import Calltoaction from '../../usersection/Calltoaction'
import Footer from '../../usersection/Footer'


const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero/>
        <Companies/>
        <Testimonial/>
        <Calltoaction/>
        <Footer/>
      
    </div>
  )
}

export default Home