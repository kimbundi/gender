import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'

const Calltoaction = () => {
  const navigate = useNavigate(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>

        <h1   className='text-xl md:text-4xl text-gray-800 font-semibold'>Stand Against Gender-Based Violence – Take Action Today!</h1>

        <p className='text-gray-500 sm:text-sm'>Gender-based violence affects millions, but together, we can create a safer world. Report incidents, access support, and find resources to protect yourself and others.</p>

        <div className='flex items-center font-medium gap-6 mt-4'>

          <button  onClick={()=>navigate('/my-reports')}  className=' cursor-pointer px-10 py-3 rounded-md text-white bg-blue-600'>REPORT NOW</button>
        </div>


        
    </div>
  )
}

export default Calltoaction