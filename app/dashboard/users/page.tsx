import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { cookies } from 'next/dist/client/components/headers';
import Table from '@/app/ui/users/table';
import { CreateUsers } from '@/app/ui/users/buttons';
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
        <h1 className={`${lusitana.className} text-2xl`}>Danh sách người dùng</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Tìm kiếm..." />
        {role?.value==='true'&&<CreateUsers />}
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table username={query} currentPage={currentPage}/>
      </Suspense>
      
    </div>
  );
}