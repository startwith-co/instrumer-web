import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col w-full relative bg-[#F8F9FB]">
      <Header />
      <main className="max-w-screen-xl min-h-[calc(100vh-60px)] mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
