import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
import { format } from 'date-fns';
import { cookies } from 'next/dist/client/components/headers';

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
  const isManager= cookies().get('isManager')
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {profit?.data.map((invoice: any) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <div className=" flex items-center">

                      <p>{format(new Date(invoice.created_at), 'dd-MM-yyyy')}</p>
                      
                    </div>
                  </div>
                </div>
                
                {isManager?.value==='true'?<div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div
                    className={"bg-black h-1.5 rounded-full"}
                    style={{
                      width:Math.floor((invoice.total_profit / Math.max(invoice.amount, 1)) * 100) + "%"
                    }}
                  ></div>
                  
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-black ">{formatCurrency(invoice.total_profit)}</span>
                  <span className="text-xs font-medium text-black ">{formatCurrency(invoice.remaining_profit)}</span>
                </div>
                </div>:<div>
                <div className="flex justify-between mb-1">
                  <span className="text-xl font-medium text-black ">{formatCurrency(invoice.amount)}</span>
                </div>
                  </div>}

                {isManager?.value==='true'&&<div className="flex w-full items-center justify-end pt-4 gap-3" >

                  {invoice.remaining_profit>0&&<div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                  </div>}
                </div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
