import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import LatestUsers from '@/app/ui/dashboard/lastest-users';
import { cookies } from 'next/dist/client/components/headers';
export default async function Page() {
  const isManager=cookies().get('isManager')
  const isAdmin=cookies().get('isAdmin')
  return (
    <main>
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          {(isManager?.value=='true'||isAdmin?.value=='true')&&<LatestUsers/>}
        </Suspense>
      </div>
    </main>
  );
}