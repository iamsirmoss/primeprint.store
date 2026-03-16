import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UpdateUserForm } from "@/components/update-user-form"
import { ChangePasswordForm } from "@/components/change-password-form"

const page = async () => {

      const headerList = await headers();

      const session = await auth.api.getSession({
            headers: headerList,
      })

      if (!session) redirect('/login');

      const FULL_POST_ACCESS = await auth.api.userHasPermission({
            headers: headerList,
            body: {
                  permissions: {
                        posts: ["update", "delete"]
                  }
            }
      })

  return (
      <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] my-6 md:my-16 min-h-screen'>
            <hr />
            <div className="py-4 md:py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                  <div className='border-b rounded py-3 w-full text-center'>
                        <h5 className='font-semibold text-2xl md:text-3xl'>Profile</h5>
                  </div>
            </div>

            {/* {session && <div className="flex items-center gap-3 mb-4">
                  <span data-role={session.user.role} className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-400 data-[role=ADMIN]:bg-red-500" />
                  Welcome {session.user.name}
            </div>}

            <div className="text-2xl font-bold">Permissions</div>

            <div className="space-x-4">
                  <Button size='sm' className="rounded">MANAGE OWN POSTS</Button>
                  <Button size='sm' className="rounded" disabled={!FULL_POST_ACCESS.success}>MANAGE ALL POSTS</Button>
            </div> */}

            <div className="mt-10">
                  <div className="size-16 md:size-24 rounded-full bg-gray-400 text-primary-foreground flex items-center justify-center">
                        <span className="uppercase text-lg font-bold">
                              {session.user.name.slice(0, 2)}
                        </span>
                  </div>
            </div>

            <div className="mt-10 space-y-4 p-4 rounded-b-md  border border-t-8 border-blue-400">
                  <h2 className="text-lg md:text-2xl font-bold">Update user</h2>

                  <UpdateUserForm
                        name={session.user.name}
                  />
            </div>

            <div className="mt-10 space-y-4 p-4 rounded-b-md  border border-t-8 border-red-400">
                  <h2 className="text-lg md:text-2xl font-bold">Change password</h2>

                  <ChangePasswordForm />
            </div>

            {/* <pre className="text-sm overflow-clip mt-6">
                  {JSON.stringify(session, null, 2)}
            </pre> */}
      </div>
  )
}

export default page
