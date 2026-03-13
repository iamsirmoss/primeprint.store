import RegisterForm from "@/components/AuthPages/Register-form"
import ReturnButton from "@/components/return-button"
import SignInOAuthButton from "@/components/sign-in-oauth-button"
import Link from "next/link"

type Props = {
  searchParams: Promise<{
    callbackURL?: string;
  }>;
};

function safeCallback(cb?: string) {
  const value = cb?.trim();
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  return value;
}

const page = async ({ searchParams }: Props) => {
      const sp = await searchParams;
      const callbackURL = safeCallback(sp?.callbackURL);
      
  return (
      <div className='min-h-screen bg-slate-100'>
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pt-16 mb-40'>
                  <ReturnButton href='/' label='Back to Home' />
                  <hr />
                  <div className="py-10 px-6 mt-8 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto bg-white rounded-md shadow-md">
                        <div className='mb-8 border-b rounded py-3 w-full text-center'>
                              <h5 className='font-semibold text-xl md:text-2xl'>Create a account</h5>
                        </div>
                        <div className="mb-8">
                              <h5 className="text-xs md:text-sm font-medium leading-tight max-w-full md:max-w-lg">
                                    Order printing services, manage projects, and save time on future orders.
                              </h5>
                        </div>
                        <RegisterForm callbackURL={callbackURL ?? undefined} />
                        <div className="flex items-center gap-4 w-full my-6">
                              <div className="flex-1 h-px bg-gray-300"></div>

                              <span className="text-sm font-medium uppercase">
                              or
                              </span>

                              <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton signUp provider="google" callbackURL={callbackURL ?? undefined} />
                        </div>
                        <div className="mt-8 flex items-center gap-1 text-xs md:text-sm">
                              <p className="">
                                    Do you already have an account ?
                              </p>
                              <Link href={callbackURL ? `/login?callbackURL=${encodeURIComponent(callbackURL)}` : "/login"} className='hover:text-blue-400 text-black underline
                              transition-all duration-500'>
                                    Login
                              </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-1 flex-wrap text-gray-400 font-medium text-xs">
                              <p>By continuing, you agree to the</p>
                              <Link href={'/terms'} className='hover:underline hover:text-blue-400 text-black
                              transition-all duration-500'>
                                    Terms
                              </Link>
                              <p>and</p>
                              <Link href={'/conditions'} className='hover:underline hover:text-blue-400 text-black
                              transition-all duration-500'>
                                    Conditions
                              </Link>
                              <p>and</p>
                              <Link href={'/privacy-policy'} className='hover:underline hover:text-blue-400 text-black
                              transition-all duration-500'>
                                    Privacy policy
                              </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-3 flex-wrap text-ss md:text-xs font-medium">
                              <Link href={'/help'} className='hover:underline hover:text-blue-400
                              transition-all duration-500'>
                                    Need Help?
                              </Link>
                              <Link href={'/privacy'} className='hover:underline hover:text-blue-400
                              transition-all duration-500'>
                                    Privacy
                              </Link>
                        </div>
                  </div>
            </div>
      </div>
  )
}

export default page
