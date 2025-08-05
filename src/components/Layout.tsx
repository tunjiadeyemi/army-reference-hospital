const Layout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`bg-[#F2F3F6] p-6 w-full h-screen overflow-hidden overflow-y-scroll ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
