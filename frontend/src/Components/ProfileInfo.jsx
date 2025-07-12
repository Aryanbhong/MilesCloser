import React from 'react'
import { profileMaker } from '../utils/helper'
import { LogOut } from 'lucide-react'

const ProfileInfo = ({userInfo , handlelogout}) => {
  return (
    userInfo && (
        <div className='flex items-center gap-3'>
       <div className='w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full text-slate-950 font-medium overflow-hidden'>
  {userInfo.profilePic ? (
    <img
      src={userInfo.profilePic}
      alt="profile"
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    profileMaker(userInfo ? userInfo.fullName : "")
  )}
</div>
      
       <div>
        <p className='text-sm font-medium'>{userInfo.fullName || ""}</p>
        <button className='text-sm text-slate-700 underline' onClick={handlelogout}>
            <LogOut/>
        </button>
       </div>
    </div>
    )
  )
}

export default ProfileInfo
