import { DashboardDrawer } from "@/components/dashboard/DashboardDrawer";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
       <DashboardDrawer/>
      <div className="">
        <h1>nav</h1>
        <main>{children}</main>
      </div>
    </div>
  );
}
