import SolutionFilter from './components/solution-filter';
import SolutionList from './components/solution-list';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <div className="flex flex-col px-[100px] py-[80px] h-full">
        <div className="flex gap-[50px]">
          <div className="w-[325px] shrink-0 overflow-y-auto">
            <SolutionFilter />
          </div>
          <div className="flex-1 overflow-y-auto">
            <SolutionList />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
