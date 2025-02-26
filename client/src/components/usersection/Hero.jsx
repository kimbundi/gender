import React from 'react'
import './Hero.css'
import Searchbar from './Searchbar'
import Button from './Button'
import Image from '../pages/user/Image'
import Line from './Line'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from -cyan-100/70'>
      <Line/>
        <p>Gender-based violence
Forcibly displaced and stateless people face higher risks of gender-based violence (GBV).

Gender based violence system is committed to protect the people  from GBV. Together with partners, governments, women-led organizations and communities, GBVS works to address GBV and implement quality programming to prevent and respond to GBV and mitigate its risks.</p>
           
           <Image/>

           <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
           Gender-based violence affects millions worldwide, leaving survivors with emotional, physical, and psychological scars. 
           Our platform is here to provide a **safe, confidential, and supportive space** for you to **report cases** and seek **help without fear or judgment**

           </p>
           <p className='md:hidden text-gray-500 max-w-sm mx-auto'>  Speak up against gender-based violence. Report incidents safely and get the support you deserve.</p>

              <Button/>
              <p>Gender-based violence (GBV) is a serious violation of human rights and a life-threatening health and protection issue. <br/>GBVS is committed to protect forcibly displaced and stateless persons from GBV. </p>
               
              
              <hr/>
              

              
              <p  className='text-blue-600'>Search for the nearest location to find assistance</p>

               <Searchbar/>



    </div>
  )
}

export default Hero