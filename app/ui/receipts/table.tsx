import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CustomersTable, FormattedCustomersTable } from '@/app/lib/definitions';
import { api } from '@/app/lib/axios';
import { UpdateInvoice } from '../invoices/buttons';
import { format } from 'date-fns';
import { formatCurrency } from '@/app/lib/utils';
import { DoneButton, PendingButton } from '../status-button';
import Pagination from '../invoices/pagination';

export default async function ReceiptsTable({
  month,
  year,
  currentPage,
}: {
  month: string;
  year: string;
  currentPage: number;
}) {
  const receipts = await api(`receipts/list-receipts/?month=${month}&year=${year}&page=${currentPage}`, 'GET')
  const calPercents = (total: number, remain: number): number => {
    const percent = (remain / total) * 100;
    return parseFloat(percent.toFixed(2));
  };

  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Người dùng
            </th>

            <th scope="col" className="px-6 py-3">
              Tổng tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng lợi nhuận
            </th>

          </tr>
        </thead>
        <tbody>
          {receipts.data.data.map((item: any, index: any) => {
            return (
              <tr key={index} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  flex gap-3 items-center">
                  <div className="mb-2 flex items-center gap-3">
                    <Image
                      src={process.env.BASE_URL + item.user_image}
                      className="rounded-full"
                      alt={`${item.username}'s profile picture`}
                      width={28}
                      height={28}
                    />
                    <div className="flex flex-col items-center gap-1">

                      <p>{item.username}</p>
                      {item.status === 'pending' ? <PendingButton /> : <DoneButton />}

                    </div>
                  </div>
                </th>

                <td className="px-6 py-4">
                  {formatCurrency(item.user_total_money)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500 flex gap-1">
                    <span>{formatCurrency(item.profit_amount)}</span>
                    <span className='text-xs text-green-500'> +{calPercents(item.user_total_money, item.profit_amount)}%</span>
                  </p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={receipts.data.pages} />
      </div>
    </div>
  );
}
