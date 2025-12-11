import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"

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
      <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
            <hr />
            <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                  <div className='mb-8 bg-slate-200 py-3 w-full'>
                        <h5 className='text-center font-semibold text-2xl'>Profile</h5>
                  </div>
            </div>

            {session && <div className="flex items-center gap-3 mb-4">
                  <span data-role={session.user.role} className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-400 data-[role=ADMIN]:bg-red-500" />
                  Welcome {session.user.name}
            </div>}

            <div className="text-2xl font-bold">Permissions</div>

            <div className="space-x-4">
                  <Button size='sm'>MANAGE OWN POSTS</Button>
                  <Button size='sm' disabled={!FULL_POST_ACCESS.success}>MANAGE ALL POSTS</Button>
            </div>

            <pre className="text-sm overflow-clip mt-6">
                  {JSON.stringify(session, null, 2)}
            </pre>
      </div>
  )
}

export default page
