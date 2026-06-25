import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
