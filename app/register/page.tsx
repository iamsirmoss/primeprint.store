import RegisterForm from "@/components/AuthPages/Register-form"
import { MagicLinkLoginForm } from "@/components/magic-link-login-form"
import ReturnButton from "@/components/return-button"
import SignInOAuthButton from "@/components/sign-in-oauth-button"
import Link from "next/link"

const page = () => {
  return (
      <div className='min-h-screen bg-slate-100'>
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pt-16 mb-40'>
                  <ReturnButton href='/' label='Back to Home' />
                  <hr />
                  <div className="py-10 px-6 mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto bg-white rounded-md shadow-md">
                        <div className='mb-8 border-b rounded py-3 w-full text-center'>
                              <h5 className='font-semibold text-2xl md:text-3xl rounded-md'>Create a account</h5>
                        </div>
                        <div className="mb-8">
                              <h5 className="text-md font-medium leading-snug max-w-full md:max-w-md">
                                    Order printing services, manage projects, and save time on future orders.
                              </h5>
                        </div>
                        <RegisterForm />
                        <div className="flex items-center gap-4 w-full my-6">
                              <div className="flex-1 h-px bg-gray-300"></div>

                              <span className="text-sm font-medium uppercase">
                              or
                              </span>

                              <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton signUp provider="google" />
                        </div>
                        <div className="mt-8 flex items-center gap-1 text-base">
                              <p className="text-gray-400 font-medium">
                                    Do you already have an account ?
                              </p>
                              <Link href={'/login'} className='font-semibold hover:underline hover:text-black text-blue-400 
                              transition-all duration-500'>
                                    Login
                              </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-1 flex-wrap text-sm text-gray-400 font-medium">
                              <p>By continuing, you agree to the</p>
                              <Link href={'/terms'} className='font-semibold hover:underline hover:text-black text-blue-400 
                              transition-all duration-500'>
                                    Terms
                              </Link>
                              <p>and</p>
                              <Link href={'/conditions'} className='font-semibold hover:underline hover:text-black text-blue-400
                              transition-all duration-500'>
                                    Conditions
                              </Link>
                              <p>and</p>
                              <Link href={'/privacy-policy'} className='font-semibold hover:underline hover:text-black text-blue-400
                              transition-all duration-500'>
                                    Privacy Policy
                              </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-3 flex-wrap text-sm font-medium">
                              <Link href={'/help'} className='hover:underline hover:text-blue-40
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
