import SolutionList from './components/solution-list';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Suspense>
        <SolutionList />
      </Suspense>
    </div>
  );
};

export default Page;
