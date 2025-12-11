import RegisterForm from "@/components/AuthPages/Register-form"
import ReturnButton from "@/components/return-button"
import SignInOAuthButton from "@/components/sign-in-oauth-button"

const page = () => {
  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                  <ReturnButton href='/' label='Back to Home' />
                  <hr />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 w-full'>
                              <h5 className='text-center font-semibold text-2xl'>Sign up</h5>
                        </div>
                        <RegisterForm />

                        <div className='mt-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton signUp provider="google" />
                        </div>
                  </div>
            </div>
  )
}

export default page
