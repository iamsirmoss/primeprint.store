import SignOutButton from "@/components/AuthPages/Sign-out-button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const page = async () => {

      const session = await auth.api.getSession({
            headers: await headers(),
      })

      if (!session) {
            return <p className="text-destructive">Unauthorized</p>
      }

  return (
      <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
            <hr />
            <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                  <div className='mb-8 bg-slate-200 py-3 w-full'>
                        <h5 className='text-center font-semibold text-2xl'>Profile</h5>
                  </div>
            </div>

            <SignOutButton />

            <pre className="text-sm overflow-clip mt-6">
                  {JSON.stringify(session, null, 2)}
            </pre>
      </div>
  )
}

export default page
