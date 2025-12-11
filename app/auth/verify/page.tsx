import ReturnButton from "@/components/return-button"
import { SendVerificationEmailForm } from "@/components/send-verification-email-form"
import { redirect } from "next/navigation"

interface PageProps {
      searchParams: Promise<{error: string}>
}

const page = async (
      {searchParams}: PageProps
) => {

      const error = (await searchParams).error

      if (!error) redirect("/profile")

  return (
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40'>
                  <ReturnButton href='/login' label='Back to login page' />
                  <hr />
                  <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
                        <div className='mb-8 bg-slate-200 py-3 rounded w-full'>
                              <h5 className='text-center text-2xl font-semibold'>Verify Email</h5>
                        </div>

                        <p className="text-destructive">
                              {error === "invalid_token" || error === "token_expired"
                              ? "Your token is invalid or expired please request a new one."
                              : error === "email_not_verified"
                              ? "Please verify your email, or request a new verification below."
                              : "Oops! Something went wrong. Please try again."}
                        </p>

                        <SendVerificationEmailForm />
                  </div>
            </div>
  )
}

export default page
