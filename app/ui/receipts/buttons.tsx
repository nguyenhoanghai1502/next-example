import { deleteInvoice } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Tạo lợi nhuận</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateReceipt({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/receipts/${id}/update`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-3" />
    </Link>
  );
}
export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      </form>
    </>
  );
}