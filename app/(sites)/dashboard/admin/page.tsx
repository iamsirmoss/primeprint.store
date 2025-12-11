import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma";
import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button";
import UserRoleSelect from "@/components/user-role-select";
import { UserRole } from "@/lib/generated/prisma/enums";

export default async function page () {

      const headerList = await headers();

      const session = await auth.api.getSession({
            headers: headerList,
      })

      if (!session) redirect('/login');

      if (session.user.role !== "ADMIN") {

            return (
                  <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                        <hr />
                              <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                                    <div className='mb-8 bg-slate-200 py-3 w-full'>
                                          <h5 className='text-center font-semibold text-2xl'>Admin Dashboard</h5>
                                    </div>
                                    <p className="p-2 rounded-md text-lg bg-red-700 text-white font-bold">FORBIDDEN</p>
                              </div>
                  </div>
                  )}

            // const users = await prisma.user.findMany({
            //       select: {
            //             id: true,
            //             name: true,
            //             email: true,
            //             role: true,
            //       },
            //       orderBy: {
            //             createdAt: 'asc'
            //       }
            // });

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
                  <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                        <hr />
                              <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                                    <div className='mb-8 bg-slate-200 py-3 w-full'>
                                          <h5 className='text-center font-semibold text-2xl'>Admin Dashboard</h5>
                                    </div>
                                    <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">ACCESS GARANTED</p>
                              </div>

                              <div className="w-full overflow-x-auto mt-10">
                                    <table className="table-auto min-w-full whitespace-nowrap">
                                          <thead>
                                                <tr className="border-b text-sm text-left">
                                                      <th className="border border-gray-300 px-4 py-2">ID</th>
                                                      <th className="border border-gray-300 px-4 py-2">Name</th>
                                                      <th className="border border-gray-300 px-4 py-2">Email</th>
                                                      <th className="border border-gray-300 px-4 py-2">Role</th>
                                                      <th className="border border-gray-300 px-4 py-2">Action</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {sortedUsers.map((user) => (
                                                      <tr key={user.id} className="border-b text-sm text-left">
                                                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                  <UserRoleSelect userId={user.id} role={user.role as UserRole} />
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2 flex items-center justify-start gap-4">
                                                                  <button className="text-blue-400 hover:underline">Edit</button>
                                                                  {
                                                                        user.role === "USER" ? <DeleteUserButton userId={user.id} /> : <PlaceholderDeleteUserButton />
                                                                  }
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                  </div>
            )

      }