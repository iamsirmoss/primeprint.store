import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ReturnButton from "@/components/return-button";
import { isAdminRole } from "@/lib/admin";
import { getDashboardStats } from "@/server/queries/dashboard";

import GradientBox from "@/components/Admin/dashboards/Dashboard2/GradientBox";
import UsersBox from "@/components/Admin/dashboards/Dashboard2/UsersBox";
import Subscriptions from "@/components/Admin/dashboards/Dashboard2/Subscriptions";
import RevenueForcastChart from "@/components/Admin/dashboards/Dashboard2/RevenueForcastChart";
import AnnualProfit from "@/components/Admin/dashboards/Dashboard2/AnnualProfit";
import NewCustomers from "@/components/Admin/dashboards/Dashboard2/NewCustomers";
import TotalIncome from "@/components/Admin/dashboards/Dashboard2/TotalIncome";
import WeeklySchedule from "@/components/Admin/dashboards/Dashboard2/WeeklySchedule";
import RevenueByProduct from "@/components/Admin/dashboards/Dashboard2/RevenueByProduct";
import SalesFromLocation from "@/components/Admin/dashboards/Dashboard2/SalesFromLocation";
import WeeklyStats from "@/components/Admin/dashboards/Dashboard2/WeeklyStats";
import DailyActivities from "@/components/Admin/dashboards/Dashboard2/DailyActivivities";

import AccessCard from "@/components/Admin/dashboards/Dashboard2/AccessCard";
import SectionCardsGrid from "@/components/Admin/dashboards/Dashboard2/SectionCardsGrid";
import RecentOrdersCard from "@/components/Admin/dashboards/Dashboard2/RecentOrdersCard";
import RecentContactsCard from "@/components/Admin/dashboards/Dashboard2/RecentContactsCard";

const Page = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");

  if (!isAdminRole(session.user.role)) {
    return (
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40 min-h-screen">
        <ReturnButton href="/" label="Back to Home" />
        <hr className="my-6" />

        <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
          <div className="mb-8 bg-slate-200 py-3 w-full rounded-xl">
            <h5 className="text-center font-semibold text-2xl">
              Admin Dashboard
            </h5>
          </div>

          <p className="p-3 rounded-md text-lg bg-red-700 text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }

  const {
    totals,
    recentOrders,
    recentContacts,
    revenueForecast,
    annualProfit,
    newCustomers,
    totalIncome,
    weeklyActivity,
    weeklyStats,
    dailyActivities,
    revenueByProduct,
    salesFromLocation,
  } = await getDashboardStats();

  function formatCurrency(cents: number, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(cents / 100);
  }

  const executiveCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totals.revenueTotalCents),
    },
    {
      title: "Revenue This Month",
      value: formatCurrency(totals.revenueThisMonthCents),
    },
    {
      title: "Customers",
      value: formatCurrency(totals.totalUsers),
    },
    {
      title: "Published Products",
      value: formatCurrency(totals.publishedProducts),
    },
  ];

  const attentionCards = [
    {
      title: "Pending Orders",
      value: formatCurrency(totals.pendingOrders),
      subtitle: "Orders waiting for processing",
    },
    {
      title: "Pending Proofs",
      value: formatCurrency(totals.pendingProofs),
      subtitle: "Customer approvals still open",
    },
    {
      title: "Pending Reviews",
      value: formatCurrency(totals.pendingReviews),
      subtitle: "Reviews waiting for moderation",
    },
    {
      title: "Low Stock Products",
      value: formatCurrency(totals.lowStockProducts),
      subtitle: "Items that may need restocking",
    },
  ];

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-6 col-span-12">
          <GradientBox
            user={{
              name: session.user.name,
              email: session.user.email,
              role: session.user.role as "USER" | "ADMIN" | "MANAGER" | "STAFF",
            }}
            revenueThisMonthCents={totals.revenueThisMonthCents}
            revenueTotalCents={totals.revenueTotalCents}
            totalOrders={totals.totalOrders}
            pendingOrders={totals.pendingOrders}
            publishedProducts={totals.publishedProducts}
          />
        </div>

        <div className="lg:col-span-3 md:col-span-6 col-span-12">
          <Subscriptions
            totalPackages={totals.totalPackages}
            activePackages={totals.activePackages}
            soldPackages={totals.soldPackages}
            packageOrders={totals.packageOrders}
          />
        </div>

        <div className="lg:col-span-3 md:col-span-6 col-span-12">
          <UsersBox
            totalUsers={totals.totalUsers}
            adminUsers={totals.adminUsers}
            managerUsers={totals.managerUsers}
            staffUsers={totals.staffUsers}
            verifiedUsers={totals.verifiedUsers}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="xl:col-span-8 col-span-12">
          <SectionCardsGrid items={executiveCards} />
        </div>

        <div className="xl:col-span-4 col-span-12">
          <AccessCard
            role={session.user.role}
            email={session.user.email}
            paidOrders={totals.paidOrders}
            completedOrders={totals.completedOrders}
            totalPackages={totals.totalPackages}
            totalContacts={totals.totalContacts}
          />
        </div>
      </div>

      <SectionCardsGrid title="Needs Attention" items={attentionCards} />

      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-8 col-span-12">
          <RevenueForcastChart
            currentYear={revenueForecast.currentYear}
            previousYear={revenueForecast.previousYear}
            categories={revenueForecast.categories}
            currentYearSeriesCents={revenueForecast.currentYearSeriesCents}
            previousYearSeriesCents={revenueForecast.previousYearSeriesCents}
            currentYearRevenueYtdCents={revenueForecast.currentYearRevenueYtdCents}
            previousYearRevenueYtdCents={revenueForecast.previousYearRevenueYtdCents}
            yearOverYearGrowthPercent={revenueForecast.yearOverYearGrowthPercent}
          />
        </div>

        <div className="lg:col-span-4 col-span-12">
          <AnnualProfit
            fulfillmentRate={annualProfit.fulfillmentRate}
            completedOrdersThisYear={annualProfit.completedOrdersThisYear}
            requiresApprovalProducts={annualProfit.requiresApprovalProducts}
            requiresUploadProducts={annualProfit.requiresUploadProducts}
            productOrderItems={annualProfit.productOrderItems}
            packageOrderItems={annualProfit.packageOrderItems}
            productMixPercent={annualProfit.productMixPercent}
            packageMixPercent={annualProfit.packageMixPercent}
            totalOrderItems={annualProfit.totalOrderItems}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-4 col-span-12 space-y-7">
          <NewCustomers
            newCustomersThisMonth={newCustomers.newCustomersThisMonth}
            verifiedNewCustomersThisMonth={newCustomers.verifiedNewCustomersThisMonth}
            verifiedNewCustomersRate={newCustomers.verifiedNewCustomersRate}
          />

          <TotalIncome
            totalIncomeCents={totalIncome.totalIncomeCents}
            incomeThisMonthCents={totalIncome.incomeThisMonthCents}
            incomeLastMonthCents={totalIncome.incomeLastMonthCents}
            incomeGrowthPercent={totalIncome.incomeGrowthPercent}
            categories={totalIncome.categories}
            seriesCents={totalIncome.seriesCents}
          />
        </div>

        <div className="lg:col-span-8 col-span-12">
          <WeeklySchedule
            categories={weeklyActivity.categories}
            ordersSeries={weeklyActivity.ordersSeries}
            contactsSeries={weeklyActivity.contactsSeries}
            totalOrders={weeklyActivity.totalOrders}
            totalContacts={weeklyActivity.totalContacts}
            totalRevenueCents={weeklyActivity.totalRevenueCents}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-8 col-span-12">
          <RevenueByProduct
            items={revenueByProduct.items}
            totalRevenueCents={revenueByProduct.totalRevenueCents}
          />
        </div>

        <div className="lg:col-span-4 col-span-12">
          <SalesFromLocation items={salesFromLocation} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <WeeklyStats
            categories={weeklyStats.categories}
            ordersSeries={weeklyStats.ordersSeries}
            totalOrders={weeklyStats.totalOrders}
            totalContacts={weeklyStats.totalContacts}
            totalRevenueCents={weeklyStats.totalRevenueCents}
          />
        </div>

        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <DailyActivities items={dailyActivities} />
        </div>

        <div className="lg:col-span-4 col-span-12">
          <RecentContactsCard contacts={recentContacts} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="col-span-12">
          <RecentOrdersCard
            orders={recentOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;