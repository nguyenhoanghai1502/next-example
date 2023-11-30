'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import format from 'date-fns/format';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const month = searchParams.get('month')?.toString()
    const year = searchParams.get('year')?.toString()
    const fromDate = month && year ? new Date(`${year}-${month}-01`) : null;
    const { replace } = useRouter();

    const handleChangeFromDate = (date: Date) => {
        console.log(`Searching... ${date}`);

        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (date) {
            params.set('month', format(date, 'MM'));
            params.set('year', format(date, 'yyyy'));
        } else {
            params.delete('month');
            params.delete('year')
        }
        replace(`${pathname}?${params.toString()}`);
    }
    
    return (

        <div date-rangepicker className="flex items-center ">
            <div className="relative">
                <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <DatePicker
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5'
                    selected={fromDate ? new Date(fromDate) : new Date()}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    placeholderText="MM/YYYY"
                    onChange={handleChangeFromDate} />
            </div>
            
        </div>

    )
}

export default DatePickerInput