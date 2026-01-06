import SolutionFilter from './components/solution-filter';
import SolutionList from './components/solution-list';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <div className="flex flex-col px-16 py-12 w-full">
        <div className="flex gap-8">
          <div className="shrink-0 w-1/5">
            <SolutionFilter />
          </div>
          <div className="flex-grow">
            <SolutionList />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
