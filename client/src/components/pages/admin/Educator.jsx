import React from 'react'
import { Outlet } from 'react-router-dom'

const Educator = () => {
  return (
    <div>
      <h1>Admin</h1>


      <div>
        {<Outlet/>}
      </div>
    </div>

  )
}

export default Educator