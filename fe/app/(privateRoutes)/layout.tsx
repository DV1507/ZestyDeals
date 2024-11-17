import CommonNavBar from "@/components/common/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <CommonNavBar />
      <div className="pt-[64px]"></div>
      {children}
    </div>
  );
};

export default Layout;
