import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
export const CommonlayoutWrapper = ({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumb}
        </div>
      </header>
      <div className="mx-10 my-5 p-5 h-full  bg-neutral-900 rounded-md">
        {children}
      </div>
    </SidebarInset>
  );
};

export default CommonlayoutWrapper;
