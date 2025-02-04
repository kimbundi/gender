import React from 'react'
import './Hero.css'
import Searchbar from './Searchbar'
import Button from './Button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from -cyan-100/70'>
        <h1 className='hero-heading-small md:hero-heading-large relative font-bold text-gray-800 max-w-3xl mx-auto'>SAY NO TO GENDER BASED VIOLENCE.<span className='text-blue-600'>REPORT YOUR CASES HERE</span></h1>
           

           <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
           Gender-based violence affects millions worldwide, leaving survivors with emotional, physical, and psychological scars. 
           Our platform is here to provide a **safe, confidential, and supportive space** for you to **report cases** and seek **help without fear or judgment**

           </p>
           <p className='md:hidden text-gray-500 max-w-sm mx-auto'>  Speak up against gender-based violence. Report incidents safely and get the support you deserve.</p>

              <Button/>
              
              <hr/>

               <Searchbar/>



    </div>
  )
}

export default Hero