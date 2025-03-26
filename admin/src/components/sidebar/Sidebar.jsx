import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Reports</p>
            </NavLink>
            < NavLink to='/cases' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Cases solved</p>

            </NavLink>
            < NavLink to='/investigate' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p> Add Investigators</p>

            </NavLink>
            < NavLink to='/listinvestigate' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Investigators</p>

            </NavLink>
            < NavLink to='/assigned' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Assigned Investigators</p>

            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar