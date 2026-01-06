import { IGetSolutionListItem } from '@/types/solution';
import Image from 'next/image';
import Link from 'next/link';

interface ISolutionListItemProps {
  solution: IGetSolutionListItem;
}

const SolutionListItem = ({ solution }: ISolutionListItemProps) => {
  const { solutionSeq, image, name, price, average, cnt, businessName } = solution;

  return (
    <Link href={`/solutions/${solutionSeq}`} className="flex flex-col gap-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#D9D9D9]">
        {image && <Image src={image} alt={name} fill className="object-cover" />}
      </div>
      <div className="flex flex-col gap-0">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-lg font-semibold text-gray-900">
          {price.toLocaleString()}원~
          <span className="text-xs font-normal text-gray-500">
            /월<span className="text-[#7A7A7A]">(VAT 별도)</span>
          </span>
        </p>
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>★</span>
            <span>
              {average}({cnt})
            </span>
          </div>
          <p className="text-xs text-gray-500">{businessName}</p>
        </div>
      </div>
    </Link>
  );
};

export default SolutionListItem;
