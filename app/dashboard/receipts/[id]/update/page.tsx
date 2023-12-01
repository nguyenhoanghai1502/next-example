import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { api } from '@/app/lib/axios';
import Form from '@/app/ui/receipts/edit-form';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [ receipt, listUsers] = await Promise.all([
        api(`receipts/get-receipt/${id}/`, 'GET', null, {id:id}),
        api('users/list-users/'),
    ]);
    console.log(receipt.data)
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Biên nhận', href: '/dashboard/receipts' },
          {
            label: 'Cập nhật biên nhận',
            href: `/dashboard/receipts/${id}/update`,
            active: true,
          },
        ]}
      />
      <Form id={id}  receipt={receipt.data} listUsers={listUsers.data.data}/>
    </main>
  );
}