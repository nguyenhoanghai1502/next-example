'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  LockClosedIcon,
  BoltIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';
import { format } from 'date-fns';
import { formatCurrency } from '@/app/lib/utils';
import { handleDivideProfit, handleUpdateReceipt } from '@/app/lib/data';
import { useState } from 'react';

export default function Form(
  {
    id, receipt, listUsers
  }: {
    id: number | string, receipt: any, listUsers: any
  }
) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const status_list = [
    { title: 'Pending', value: 'pending' },
    { title: 'Done', value: 'completed' }
  ]
  const image_host = process.env.BASE_URL
  console.log(receipt)
  const updateReceiptWithId = handleUpdateReceipt.bind(null, id);
  return (
    <form action={updateReceiptWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Chọn người dùng
          </label>
          <div className="relative" >
            <select
              id="user"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={receipt.user}

            >
              <option value="" disabled>
                Chọn người dùng
              </option>
              {listUsers.map((customer: any) => (
                <option key={customer.id} value={customer.id} disabled={receipt.status === 'completed' && customer.id !== receipt.user}>
                  {customer.username}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="profit_amount" className="mb-2 block text-sm font-medium">
            Tổng lợi nhuận
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="profit_amount"
                type="number"
                defaultValue={receipt.profit_amount}
                readOnly
                placeholder="Nhập tổng tiền"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Trạng thái
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={receipt.status}
            >
              <option value="" disabled>
                Trạng thái
              </option>
              {status_list.map((status: any) => (
                <option key={status.value} value={status.value}>
                  {status.title}
                </option>
              ))}
            </select>
            <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="manager" className="mb-2 block text-sm font-medium">
            Hình ảnh chuyển khoản
          </label>
          <div className="relative">
            {<input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              placeholder="Nhập tổng tiền"
              onChange={handleFileChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />}
            {file && (
              <Image
                alt={'hinh anh'}
                src={URL.createObjectURL(file)}
                className="w-full"
                width={1920}
                height={1080}
              />
            )}
            {receipt.image !== '/media/default_user.jpeg' && <Image alt={receipt.user} src={image_host + receipt.image} className='w-full' width={1920} height={1080} />}
            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/dashboard/receipts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Hủy
        </Link>
        <Button type="submit">Chỉnh sửa</Button>
      </div>
    </form>
  );
}
