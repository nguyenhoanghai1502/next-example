import Form from '@/app/ui/users/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { api } from '@/app/lib/axios';
 
export default async function Page() {
  const [listUsers] = await Promise.all([
    api('users/list-users/'),
]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Người dùng', href: '/dashboard/users' },
          {
            label: 'Tạo Người Dùng',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />
      <Form listUsers={listUsers.data.data}/>
    </main>
  );
}