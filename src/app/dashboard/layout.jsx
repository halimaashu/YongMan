import { DashboardDrawer } from "@/components/dashboard/DashboardDrawer";

export default function DashboardLayout({ children }) {
  return (
    <div className="md:flex min-h-screen ">
      {/* Sidebar */}
      <DashboardDrawer />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 border-b  flex items-center px-4 md:px-6">
          <h1 className="text-lg font-semibold">Nav</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}