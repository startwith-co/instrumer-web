import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import Image from 'next/image';
import Link from 'next/link';

const HomeSolutionSection = () => {
  return (
    <section id="solution" className="flex w-full flex-col gap-12 px-16">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-center text-4xl tracking-tighter font-semibold" id="top">
          어떤
          <span className="text-primary font-bold"> 솔루션</span>이 필요하신가요?
        </h1>
        <p className="text-center text-lg font-medium tracking-tight">
          <span className="text-primary font-semibold">인스트루머</span>의 체계적인 솔루션 분류 체계를 통해
          <span className="font-semibold"> 더 정확하고, 간편하게</span> 지금 바로 고민을
          <span className="text-primary font-semibold"> 해결해보세요.</span>
        </p>
      </div>
      <ul className="grid grid-cols-3 gap-8">
        {CATEGORY_OPTIONS.map((button) => (
          <li key={button.value}>
            <Link href={`/solutions?category=${button.value}`} className="flex flex-col items-center">
              <figure className="flex w-full flex-col items-center gap-4">
                <div className="relative aspect-[4/3] w-full">
                  {button.image ? (
                    <Image src={button.image as string} alt={button.label as string} fill className="object-cover" />
                  ) : (
                    <div className="relative aspect-[4/3] w-full bg-gray-200" />
                  )}
                </div>
                <figcaption className="text-xl font-medium tracking-tight">
                  {button.label as React.ReactNode}
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeSolutionSection;
