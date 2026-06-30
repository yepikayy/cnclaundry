import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — CNC Laundry" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar userEmail={user.email ?? ""} />
      <div className="flex-1 flex flex-col lg:ml-0 pt-14 lg:pt-0 min-w-0">
        {children}
      </div>
    </div>
  );
}
