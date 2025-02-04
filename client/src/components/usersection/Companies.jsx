import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div  className='pt-16'>
      <p className='text-base text-gray-500'>Together with our trusted partners, including non-governmental organizations, healthcare providers, law enforcement agencies, and legal advocacy groups, we are committed to offering comprehensive support and resources for survivors of gender-based violence</p>
      <div className='flex flex-wrap items-centre justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        
      <img src={assets.police_logo} alt="" className='w-20 md:w-28' />
      <img src={assets.redcross_logo} alt="" className='w-20 md:w-28' />
      <img src={assets.helmet_logo} alt="" className='w-20 md:w-28' />
      </div>




      
    </div>
  )
}

export default Companies