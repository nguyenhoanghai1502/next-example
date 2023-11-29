import Form from '@/app/ui/invoices/divide-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { api } from '@/app/lib/axios';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [listUsers, user] = await Promise.all([
        api('users/list-users/'),
        api(`users/detail/${id}`, 'GET', null, {id:id}),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Người dùng', href: '/dashboard/users' },
          {
            label: 'Chỉnh sửa người dùng',
            href: `/dashboard/users/${id}/update`,
            active: true,
          },
        ]}
      />
      {/* <Form listUsers={listUsers.data} /> */}
    </main>
  );
}