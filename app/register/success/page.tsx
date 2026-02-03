import ReturnButton from "@/components/return-button";

interface PageProps {
  searchParams: Promise<{ callbackURL?: string }>;
}

const page = async ({ searchParams }: PageProps) => {

      const { callbackURL } = await searchParams;
      const cb = callbackURL && callbackURL.startsWith("/") ? callbackURL : "/profile";

  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                  <ReturnButton href={`/login?callbackURL=${encodeURIComponent(cb)}`} label='Back to login page' />
                  <hr />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 rounded w-full'>
                              <h5 className='text-center text-2xl font-semibold'>Success</h5>
                        </div>

                        <p className="text-muted-foreground">
                              Success! You have successfully registered. Please check your email for the verification link.
                        </p>
                  </div>
            </div>
  )
}

export default page
