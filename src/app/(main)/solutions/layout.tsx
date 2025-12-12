import SolutionFilter from './components/solution-filter';
import { Suspense } from 'react';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col px-[100px] py-[80px]">
      <div className="flex gap-[50px] h-[calc(100vh-90px)]">
        <div className="w-[325px] shrink-0 overflow-y-auto">
          <Suspense>
            <SolutionFilter />
          </Suspense>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
