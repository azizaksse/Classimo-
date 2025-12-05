import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import DashboardCards from "./components/DashboardCards";
import { getAdminStats } from "@/lib/actions/admin-stats";

export default async function AdminPage() {
  const { pendingOrders, totalProducts } = await getAdminStats();

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Admin"
        title="لوحة تحكم Classimo"
        description="إحصائيات مباشرة من Supabase للطلبات والمنتجات."
      />

      <DashboardCards
        pendingOrders={pendingOrders}
        totalProducts={totalProducts}
      />

      <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm">
          يمكنك تصدير بيانات الطلبات أو المنتجات من Supabase مباشرة أو عبر CSV.
        </p>
        <Button variant="outline" className="mt-4">
          تصدير تقرير سريع
        </Button>
      </div>
    </div>
  );
}
