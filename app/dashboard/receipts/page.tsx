import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
import { cookies } from 'next/dist/client/components/headers';
import Table from '@/app/ui/receipts/table';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query); 
  const role= cookies().get('isAdmin')
  console.log(role)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Danh sách biên nhận</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Tìm kiếm..." />
        {role?.value==='true'&&<CreateInvoice />}
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={0} />
      </div>
    </div>
  );
}