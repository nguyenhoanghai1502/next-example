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
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';
import { format } from 'date-fns';
import { formatCurrency } from '@/app/lib/utils';
import { handleDivideProfit, handleUpdateUser } from '@/app/lib/data';

export default function Form(
  {
    id, listUsers, user
  }: {
    id:number|string,listUsers: any, user: any
  }
) {
  console.log(user.id)
  const updateUserWithId = handleUpdateUser.bind(null,id);
  return (
    <form action={updateUserWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Tên người dùng
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={user.username}
                placeholder="Nhập tên người dùng"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Mật khẩu
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Nhập mật khẩu mới"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="total_money" className="mb-2 block text-sm font-medium">
            Tổng tiền
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total_money"
                name="total_money"
                type="number"
                defaultValue={user.total_money}
                placeholder="Nhập tổng tiền"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="bank_name" className="mb-2 block text-sm font-medium">
            Tên ngân hàng
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="bank_name"
                name="bank_name"
                type="text"
                defaultValue={user.bank_name}
                placeholder="Nhập tên ngân hàng"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="bank_id" className="mb-2 block text-sm font-medium">
            Số tài khoản
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="bank_id"
                name="bank_id"
                type="number"
                defaultValue={user.bank_id}
                placeholder="Nhập số tài khoản ngân hàng"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="manager" className="mb-2 block text-sm font-medium">
            Chọn người quản lý
          </label>
          <div className="relative">
            <select
              id="manager"
              name="manager"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={user.manager}
            >
              <option value="" disabled>
                Chọn người quản lý
              </option>
              {listUsers.map((customer: any) => (
                <option key={customer.id} value={customer.id}>
                  {customer.username}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
        <Button type="submit">Chỉnh sửa</Button>
      </div>
    </form>
  );
}
