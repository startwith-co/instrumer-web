interface ILayoutProps {
  children?: React.ReactNode;
}

const VendorLayout = ({ children }: ILayoutProps) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default VendorLayout;
