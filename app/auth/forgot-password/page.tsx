import { ForgotPasswordForm } from "@/components/forgot-password-form"
import ReturnButton from "@/components/return-button"

const page = () => {

  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                  <ReturnButton href='/login' label='Back to login page' />
                  <hr />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 rounded w-full'>
                              <h5 className='text-center text-2xl font-semibold'>Forgot password</h5>
                        </div>

                        <p className="text-muted-foreground">
                              Please enter your email address to receive a password reset link.
                        </p>

                        <ForgotPasswordForm />
                  </div>
            </div>
  )
}

export default page
