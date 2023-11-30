import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
import { cookies } from 'next/dist/client/components/headers';
import DatePickerInput from '@/app/ui/date-picker';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    month?: string;
    page?: string;
    year?:string;
  };
}) {
  const month = searchParams?.month || '';
  const year=searchParams?.year||'';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query); 
  const role= cookies().get('isAdmin')
  console.log(role)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Danh sách lợi nhuận</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Tìm kiếm..." /> */}
        <DatePickerInput/>
        {role?.value==='true'&&<CreateInvoice />}
      </div>
      <Suspense key={month+year + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table month={month} year={year} currentPage={currentPage} />
      </Suspense>
      
    </div>
  );
}