import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
import { format } from 'date-fns';
import { cookies } from 'next/dist/client/components/headers';
import { tr } from 'date-fns/locale';
import Link from 'next/link';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const profit = await api(`profits/list/?date=${query}`, 'GET')
  console.log(profit)
  const isManager = cookies().get('isManager')
  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            
            <th scope="col" className="px-6 py-3">
              LN đã chia
            </th>
            <th scope="col" className="px-6 py-3">
              LN còn lại
            </th>

          </tr>
        </thead>
        <tbody>
          {profit.data.map((item:any, index:any) => {
            return (
              <tr key={index} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-3 items-center">
                  {format(new Date(item.created_at), 'dd-MM-yyyy')}
                  <UpdateInvoice id={item.id} />
                </th>
                
                <td className="px-6 py-4">
                  {formatCurrency(item.total_profit)}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(item.remaining_profit)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

  );
}
