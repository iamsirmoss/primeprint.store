import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button";
import UserRoleSelect from "@/components/user-role-select";
import { UserRole } from "@/lib/generated/prisma/enums";
import ReturnButton from "@/components/return-button";

const page = async () => {
   const headerList = await headers();

      const session = await auth.api.getSession({
            headers: headerList,
      })

      if (!session) redirect('/login');

      if (session.user.role !== "ADMIN") {

            return (
                  <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
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
                  <div className=''>
                        <h1>Admin</h1>
                  </div>
            )

      }

export default page
