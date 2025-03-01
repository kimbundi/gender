import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/Appcontext'





const Navbar = () => {
  const { navigate,isAdmin } = useContext(AppContext);


  const isGenderlistpage = location.pathname.includes('/gender-list');

  const {openSignIn} = useClerk()
  const {user} = useUser()




  return (
    <div  className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${ isGenderlistpage ? 'bg-white' : 'bg-cyan-100/70'}`}>
     <img   onClick={()=>navigate('/')}  src={assets.logo} alt="logo" className="w-20 h-20 rounded-full lg:w-20 cursor-pointer " />
     <div className='hidden md:flex items-center gap-5 text-gray-500'>
      <div className='flex items-center gap-5'>
        { user && <>
       
        <Link  to={'/my-reports'} > Report  Case</Link>
        </>
        }

      </div>
      {user ? <UserButton/>
:          
        
        <button   onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
}

     </div>
     {/*for phone screens */}
     <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
      <div className='flex items-center gap-2 sm:gap-3 max-sm:text-xs'>
        {user && <>
          

        <Link  to={'/my-reports'} > Report a case</Link>
        </>
        }
      
      </div>
      {
        user ? <UserButton/> :
        <button onClick={()=>openSignIn()}><img src={assets.usericon} alt="" className='w-7 h-6' /></button>


      }


     </div>

    </div>
  )
}

export default Navbar