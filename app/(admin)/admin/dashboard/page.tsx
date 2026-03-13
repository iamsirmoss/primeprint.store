import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button";
import UserRoleSelect from "@/components/user-role-select";
import { UserRole } from "@/lib/generated/prisma/enums";
import ReturnButton from "@/components/return-button";
import GradientBox from "@/components/Admin/dashboards/Dashboard2/GradientBox";
import Subscriptions from "@/components/Admin/dashboards/Dashboard2/Subscriptions";
import UsersBox from "@/components/Admin/dashboards/Dashboard2/UsersBox";
import RevenueForcastChart from "@/components/Admin/dashboards/Dashboard2/RevenueForcastChart";
import AnnualProfit from "@/components/Admin/dashboards/Dashboard2/AnnualProfit";
import type { Metadata } from "next";
import NewCustomers from "@/components/Admin/dashboards/Dashboard2/NewCustomers";
import TotalIncome from "@/components/Admin/dashboards/Dashboard2/TotalIncome";
import WeeklySchedule from "@/components/Admin/dashboards/Dashboard2/WeeklySchedule";
import RevenueByProduct from "@/components/Admin/dashboards/Dashboard2/RevenueByProduct";
import SalesFromLocation from "@/components/Admin/dashboards/Dashboard2/SalesFromLocation";
import WeeklyStats from "@/components/Admin/dashboards/Dashboard2/WeeklyStats";
import DailyActivities from "@/components/Admin/dashboards/Dashboard2/DailyActivivities";
import FigmaCard from "@/components/Admin/dashboards/Dashboard2/FigmaCard";

const page = async () => {
   const headerList = await headers();

      const session = await auth.api.getSession({
            headers: headerList,
      })

      if (!session) redirect('/login');

      if (session.user.role !== "ADMIN") {

            return (
                  <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40 min-h-screen'>
                        <ReturnButton href='/' label='Back to Home' />
                        <hr />
                              <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                                    <div className='mb-8 bg-slate-200 py-3 w-full'>
                                          <h5 className='text-center font-semibold text-2xl'>Admin Dashboard</h5>
                                    </div>
                                    <p className="p-2 rounded-md text-lg bg-red-700 text-white font-bold">FORBIDDEN</p>
                              </div>
                  </div>
                  )}

            const { users } = await auth.api.listUsers({
                  headers: headerList,
                  query: { 
                        sortBy: "name",
                   }
            })

            const sortedUsers = users.sort((a, b) => {
                  if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
                  if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
                  return 0
            })
            
            return (
                  <>
                        <div className="grid grid-cols-12 gap-7">
                              <div className="lg:col-span-6 col-span-12">
                                    <GradientBox user={session.user} />
                              </div>
                              <div className="lg:col-span-3 md:col-span-6 col-span-12">
                                    <Subscriptions />
                              </div>
                              <div className="lg:col-span-3 md:col-span-6 col-span-12">
                                    <UsersBox />
                              </div>
                              <div className="lg:col-span-8 col-span-12">
                                    <RevenueForcastChart />
                              </div>
                              <div className="lg:col-span-4 col-span-12">
                                    <AnnualProfit />
                              </div>
                              <div className="lg:col-span-4 col-span-12">
                                    <NewCustomers />
                                    <TotalIncome />
                              </div>
                              <div className="lg:col-span-8 col-span-12">
                                    <WeeklySchedule />
                              </div>
                              <div className="lg:col-span-8 col-span-12">
                                    <RevenueByProduct />
                              </div>
                              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                    <SalesFromLocation />
                              </div>
                              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                    <WeeklyStats />
                              </div>
                              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                    <DailyActivities />
                              </div>
                              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                    <FigmaCard />
                              </div>
                        </div>
                  </>
            )

      }

export default page
