import LoginForm from '@/components/AuthPages/Login-form'
import { MagicLinkLoginForm } from '@/components/magic-link-login-form'
import ReturnButton from '@/components/return-button'
import SignInOAuthButton from '@/components/sign-in-oauth-button'

const page = () => {
  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                  <ReturnButton href='/' label='Back to Home' />
                  <hr />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 rounded w-full'>
                              <h5 className='text-center text-2xl font-semibold'>Sign in</h5>
                        </div>
                        
                        <LoginForm />

                        <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton provider="google" />
                        </div>
                        <MagicLinkLoginForm />
                  </div>
            </div>
  )
}

export default page
