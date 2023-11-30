import Image from 'next/image';
import { api } from '@/app/lib/axios';
import { formatCurrency } from '@/app/lib/utils';
import { UpdateUsers } from './buttons';
import { cookies } from 'next/dist/client/components/headers';
import Pagination from '../invoices/pagination';

export default async function ReceiptsTable({
    username,
    currentPage,
}: {
    username: string;
    currentPage: number;
}) {
    const users = await api(`users/list-users/?username=${username}&page=${currentPage}`, 'GET')
    console.log(users)
    const isAdmin = cookies().get('isAdmin')
    return (
        <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tên
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tổng tiền
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngân hàng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            STK
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quản lý
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {users.data.data.map((item: any, index: any) => {
                        return (
                            <tr key={index} className="bg-white border-b ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  flex gap-3 items-center">
                                    <div className="mb-2 flex items-center gap-3">
                                        <Image
                                            src={item.image_profile ? process.env.BASE_URL + item.image_profile : ""}
                                            className="rounded-full"
                                            alt={`${item.username}'s profile picture`}
                                            width={28}
                                            height={28}
                                        />
                                        <p>{item.username}</p>
                                        {isAdmin?.value === 'true' && <UpdateUsers id={item.id} />}
                                    </div>
                                </th>

                                <td className="px-6 py-4">
                                    {formatCurrency(item.total_money)}
                                </td>
                                <td className="px-6 py-4">

                                    {item.bank_name}
                                </td>
                                <td className="px-6 py-4 ">

                                    {item.bank_id}
                                </td>
                                <td className="px-6 py-4">
                                    {item.manager_username}
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={users.data.pages} />
            </div>
        </div>
    );
}
