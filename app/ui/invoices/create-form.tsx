'use client';

import Link from 'next/link';
import {
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { handleCreateProfit } from '@/app/lib/data';

export default function Form() {

  return (
    <form action={handleCreateProfit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lợi nhuận chia
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Nhập lợi nhuận muốn chia"
                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Hủy
        </Link>
        <Button type="submit">Tạo lợi nhuận</Button>
      </div>
    </form>
  );
}
