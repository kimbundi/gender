import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'




import Player from './components/pages/user/Player'

import Genderlist from './components/pages/user/Genderlist'
import Genderviolencedetails from './components/pages/user/Genderviolencedetails'
import Myreports from './components/pages/user/Myreports'
import Home from './components/pages/user/Home'
import Loading from './components/usersection/Loading'
import Educator from './components/pages/admin/Educator'
import Dashboard from './components/pages/admin/Dashboard'
import Addcourse from './components/pages/admin/Addcourse'
import Mycourses from './components/pages/admin/Mycourses'
import Reports from './components/pages/admin/Reports'
import Navbar from './components/usersection/Navbar'
import Location from './components/pages/user/Location'

const App = () => {

const isAdminRoute = useMatch('/admin/*')



  return (
    <div className='text-default min-h-screen bg-white'>
      {!isAdminRoute &&  <Navbar/> }
     
      <Routes>
        <Route  path='' element={<Home/>} />
        <Route  path='/gender-list' element={<Genderlist/>} /> 
        <Route  path='/location/:city' element={<Location/>} /> 
        <Route  path='/gender-list/:input' element={<Genderlist/>} />

        <Route  path='/details/:id' element={<Genderviolencedetails/>} />
        <Route  path='/my-reports' element={<Myreports/>} />
        <Route  path='/player/:courseId' element={<Player/>} />
        <Route  path='/loading/:path' element={<Loading/>} />


         <Route path='/admin' element={<Educator/>}>
         <Route  path='admin' element={<Dashboard/>} />
         <Route  path='add-course' element={<Addcourse/>} />
         <Route  path='my-courses' element={<Mycourses/>} />
         <Route  path='reports' element={<Reports/>} />





         

         </Route>










      </Routes>


    </div>
  )
}

export default App