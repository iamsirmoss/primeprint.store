import LoginForm from '@/components/AuthPages/Login-form'
import { MagicLinkLoginForm } from '@/components/magic-link-login-form'
import ReturnButton from '@/components/return-button'
import SignInOAuthButton from '@/components/sign-in-oauth-button'
import Link from 'next/link'

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
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 md:py-20'>
                  <ReturnButton href='/' label='Back to Home' />
                  <hr />
                  <div className="py-10 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto bg-white rounded-md shadow-md px-6 mt-8">
                        <div className='mb-8 border-b py-3 rounded w-full'>
                              <h5 className='text-center text-xl md:text-2xl font-semibold'>Sign in</h5>
                        </div>
                        <div className="mb-8">
                              <h5 className="text-xs md:text-sm font-medium leading-snug max-w-full md:max-w-md">
                                    Welcome back 👋
                              </h5>
                              <h5 className="mt-2 text-xs md:text-sm font-medium leading-snug max-w-full md:max-w-md">
                                    Sign in to access your orders, saved designs, and checkout faster.
                              </h5>
                        </div>
                        <LoginForm callbackURL={callbackURL ?? undefined} />
                        <div className="flex items-center gap-4 w-full my-6">
                              <div className="flex-1 h-px bg-gray-300"></div>

                              <span className="text-sm font-medium uppercase">
                              or
                              </span>

                              <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton provider="google" callbackURL={callbackURL ?? undefined} />
                        </div>
                        <MagicLinkLoginForm callbackURL={callbackURL ?? undefined} />
                        <div className="mt-8 flex items-center gap-1 text-xs md:text-sm">
                              <p className="">
                                    You don&apos;t have an account ?
                              </p>
                              <Link href={callbackURL ? `/register?callbackURL=${encodeURIComponent(callbackURL)}` : "/register"} className='underline text-black hover:text-blue-400 
                              transition-all duration-500'>
                                    Sign up
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
