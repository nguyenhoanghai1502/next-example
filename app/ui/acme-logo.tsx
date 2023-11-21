import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default async function AcmeLogo() {
  return (
    <div className="flex flex-col">
      <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="w-12 rotate-[15deg]" />
      <p className="text-[44px]">Nera</p>
    </div>
    </div>
  );
}
