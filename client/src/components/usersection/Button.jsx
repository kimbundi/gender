import React from 'react'
import './Button.css'
import { useNavigate } from 'react-router-dom'

const Button = () => {

    const navigate =useNavigate();
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        navigate('/my-reports');

    }
  return (
    <div>
        <button   onClick={onSubmitHandler}    className='button'>REPORT A CASE</button>
    </div>
  )
}

export default Button