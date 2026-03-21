import { useMemo, useState } from "react";
import Sidebar from "../../components/admin/layout/Sidebar";
import Header from "../../components/admin/layout/Header";
import DashboardOverview from "../../components/admin/dashboard/DashboardOverview";
import LiveMarketModule from "../../components/admin/market/LiveMarketModule";
import MessagesModule from "../../components/admin/messages/MessagesModule";
import BlogsModule from "../../components/admin/blogs/BlogsModule";
// import PortfolioModule from "../../components/admin/portfolio/PortfolioModule";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false);

  const pageTitle = useMemo(() => {
    const map = {
      market: "Live Market Overview",
      messages: "Messages",
      blogs: "Blogs",
      portfolio: "Portfolio",
      dashboard: "Dashboard",
    };
    return map[active] || "Dashboard";
  }, [active]);

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">
      <Sidebar active={active} setActive={setActive} open={open} setOpen={setOpen} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header title={pageTitle} setOpen={setOpen} />

        <main className="flex-1 p-4 sm:p-5 lg:p-6">
          {active === "dashboard" && <DashboardOverview />}
          {active === "market"    && <LiveMarketModule />}
          {active === "messages"  && <MessagesModule />}
          {active === "blogs"     && <BlogsModule />}
          {/* {active === "portfolio" && <PortfolioModule />} */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;