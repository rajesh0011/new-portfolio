import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Projects CMS",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
