import Form from '@/app/ui/invoices/divide-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
//   const customers = await fetchCustomers();
    const [listUsers, profit, profit_list] = await Promise.all([
        api('users/list-users/'),
        api(`profits/detail/${id}`, 'GET', null, {id:id}),
        api('profits/list/', 'GET')
    ]);
    console.log( profit.data, profit_list.data)
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lợi nhuận', href: '/dashboard/invoices' },
          {
            label: 'Chia lợi nhuận',
            href: `/dashboard/invoices/${id}/divide-profit`,
            active: true,
          },
        ]}
      />
      <Form listUsers={listUsers.data} profit={profit.data[0]} profit_list={profit_list.data}/>
    </main>
  );
}