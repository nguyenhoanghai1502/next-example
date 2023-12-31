
import { api } from '@/app/lib/axios'
import { formatCurrency } from '@/app/lib/utils'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Profile =async (props: Props) => {
    const profile= await api('users/profile/', 'GET')
    console.log(profile)
    if (!profile.data) {
        redirect('/login')
      }
    const isManager=cookies().get('isManager')
  return (
    <div className="flex items-center rounded-md p-3 gap-4 w-100">
        <img className="w-10 h-10 rounded-full" src={`${process.env.BASE_URL}${profile.data?.image_profile}`} alt="avatar" />
        <div className="font-medium text-black">
            <p>{profile.data?.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tổng tiền: {formatCurrency(profile.data?.total_money)}</p>
            <div>
              {isManager?.value=='true'&&<p className="text-xs text-gray-500 dark:text-gray-400">Lợi nhuận đã chia: {formatCurrency(profile.data?.total_divided_profit)}</p>}
            {<p className="text-xs text-gray-500 dark:text-gray-400">{isManager?.value=='true'?'Lợi nhuận còn lại:':'Tổng lợi nhuận'} {formatCurrency(profile.data?.total_remaining_profit)}</p>}
            </div>
        </div>
    </div>
  )
}

export default Profile