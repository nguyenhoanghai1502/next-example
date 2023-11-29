import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CustomersTable, FormattedCustomersTable } from '@/app/lib/definitions';
import { api } from '@/app/lib/axios';
import { UpdateInvoice } from '../invoices/buttons';
import { format } from 'date-fns';
import { formatCurrency } from '@/app/lib/utils';

export default async function ReceiptsTable() {
  const receipts = await api(`receipts/list-receipts/`, 'GET')
  console.log('~~~~~~~~~~~~~~~~~~~', receipts.data)
  const calPercents = (total: number, remain: number): number => {
    const percent = (remain / total) * 100;
    return parseFloat(percent.toFixed(2));
  };

  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {receipts.data.map((item: any, index: any) => {
            return (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-3 items-center">
                  <div className="mb-2 flex items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src={process.env.BASE_URL + item.user_image}
                        className="rounded-full"
                        alt={`${item.username}'s profile picture`}
                        width={28}
                        height={28}
                      />
                      <p>{item.username}</p>
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
    </div>
  );
}
