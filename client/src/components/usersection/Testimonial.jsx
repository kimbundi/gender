import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonial = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>

      <h2  className='text-3xl font-medium text-gray-800'  >Testimonials</h2>


      <p className='md:text-base text-gray-500 mt-3'> The Testimonials section highlights the courageous stories of individuals who have experienced gender-based violence,<br/>Sharing these stories helps raise awareness, foster a deeper understanding of gender-based violence, and encourage others to seek help</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14'>
        {dummyTestimonial.map((Testimonial,index)=>(
          <div   className='text-sm text-left border border-gray-500/30 pb-6 rounded-1g bg-white shadow-[0px_4px_15px_0px]  shadow_black/5 overflow-hidden'  key={index}>
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img  className='h-12 w-12 rounded-full'    src={Testimonial.image} alt="" />
              <div>
                <h1 className='text-1g font-medium text-gray-800' >{Testimonial.name}</h1>
                <p className='text=gray-800/80'> {Testimonial.role}</p>
              </div>

            </div>
            
            <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_,i)=>(
                  <img className='h-5'  key={i} src={i < Math.floor(Testimonial.rating) ? assets.star:assets.star_blank}/>
                ))}
              </div>
              <p className='text-gray-500 mt-5'>{Testimonial.feedback}</p>
            </div>

            </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonial