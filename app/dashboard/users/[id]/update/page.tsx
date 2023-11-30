import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { api } from '@/app/lib/axios';
import Form from '@/app/ui/users/edit-form';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [listUsers, user] = await Promise.all([
        api('users/list-users/'),
        api(`users/get-user/${id}/`, 'GET', null, {id:id}),
    ]);
    console.log(listUsers.data, user)
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
      <Form id={id} listUsers={listUsers.data} user={user.data} />
    </main>
  );
}