import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import Profile from './profile';
import { Suspense } from 'react';
import { ProfileSkeleton } from '../skeletons';
import { cookies } from 'next/dist/client/components/headers';
import { redirect } from 'next/navigation';

export default function SideNav() {
  const handleLogout=async ()=>{
    'use server';
    cookies().delete('access_token')
    redirect('/login')
  }
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-black p-4 "
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      <div
        className="mb-2 rounded-md bg-gray-200 p-4 "
      >
        <div className="text-white md:w-40">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
        </div>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form action={handleLogout}>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
          </form>
      </div>
    </div>
  );
}
