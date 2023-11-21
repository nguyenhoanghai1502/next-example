
import { api } from '@/app/lib/axios'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Profile =async (props: Props) => {
    const profile= await api('users/profile/', 'GET')
    if (!profile.data) {
        redirect('/login')
      }
    
  return (
    <div className="flex items-center rounded-md p-3 gap-4 w-100">
        <img className="w-10 h-10 rounded-full" src={`${process.env.BASE_URL}${profile.data?.image_profile}`} alt="avatar" />
        <div className="font-medium text-black">
            <p>{profile.data?.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tổng tiền: {profile.data?.total_money}</p>
        </div>
    </div>
  )
}

export default Profile