import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const PasswordInput = ({ value, onChange, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const setPasswordToggle =()=>{
        setIsShowPassword(!isShowPassword);
    };
  return (
    <div className='flex items-center bg-pink-600/5 px-5 rounded mb-3'>
      
      <input 
      type={isShowPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Password"}
      className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
      />

      {isShowPassword ? (
        <FaRegEye
        size={22}
        className='text-pink-500 cursor-pointer'
        onClick={()=> setPasswordToggle()}
        />
      ) :(
        <FaRegEyeSlash
        size={22}
        className='text-pink-500 cursor-pointer'
        onClick={()=> setPasswordToggle()}
        />
      )}
    </div>
  )
}

export default PasswordInput
