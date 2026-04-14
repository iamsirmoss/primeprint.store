// import RegisterForm from "@/components/AuthPages/Register-form"
// import ReturnButton from "@/components/return-button"
// import SignInOAuthButton from "@/components/sign-in-oauth-button"
// import Link from "next/link"

// type Props = {
//   searchParams: Promise<{
//     callbackURL?: string;
//   }>;
// };

// function safeCallback(cb?: string) {
//   const value = cb?.trim();
//   if (!value) return null;
//   if (!value.startsWith("/")) return null;
//   if (value.startsWith("//")) return null;
//   return value;
// }

// const page = async ({ searchParams }: Props) => {
//       const sp = await searchParams;
//       const callbackURL = safeCallback(sp?.callbackURL);
      
//   return (
//       <div className='min-h-screen bg-slate-100'>
//             <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 md:py-20'>
//                   <ReturnButton href='/' label='Back to Home' />
//                   <hr />
//                   <div className="py-10 px-6 mt-8 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto bg-white rounded-md shadow-md">
//                         <div className='mb-8 border-b rounded py-3 w-full text-center'>
//                               <h5 className='font-semibold text-xl md:text-2xl'>Create a account</h5>
//                         </div>
//                         <div className="mb-8">
//                               <h5 className="text-xs md:text-sm font-medium leading-tight max-w-full md:max-w-lg">
//                                     Order printing services, manage projects, and save time on future orders.
//                               </h5>
//                         </div>
//                         <RegisterForm callbackURL={callbackURL ?? undefined} />
//                         <div className="flex items-center gap-4 w-full my-6">
//                               <div className="flex-1 h-px bg-gray-300"></div>

//                               <span className="text-sm font-medium uppercase">
//                               or
//                               </span>

//                               <div className="flex-1 h-px bg-gray-300"></div>
//                         </div>
//                         <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
//                               <SignInOAuthButton signUp provider="google" callbackURL={callbackURL ?? undefined} />
//                         </div>
//                         <div className="mt-8 flex items-center gap-1 text-xs md:text-sm">
//                               <p className="">
//                                     Do you already have an account ?
//                               </p>
//                               <Link href={callbackURL ? `/login?callbackURL=${encodeURIComponent(callbackURL)}` : "/login"} className='hover:text-blue-400 text-black underline
//                               transition-all duration-500'>
//                                     Login
//                               </Link>
//                         </div>
//                         <div className="mt-8 flex items-center gap-1 flex-wrap text-gray-400 font-medium text-xs">
//                               <p>By continuing, you agree to the</p>
//                               <Link href={'/terms'} className='hover:underline hover:text-blue-400 text-black
//                               transition-all duration-500'>
//                                     Terms
//                               </Link>
//                               <p>and</p>
//                               <Link href={'/conditions'} className='hover:underline hover:text-blue-400 text-black
//                               transition-all duration-500'>
//                                     Conditions
//                               </Link>
//                               <p>and</p>
//                               <Link href={'/privacy-policy'} className='hover:underline hover:text-blue-400 text-black
//                               transition-all duration-500'>
//                                     Privacy policy
//                               </Link>
//                         </div>
//                         <div className="mt-8 flex items-center gap-3 flex-wrap text-ss md:text-xs font-medium">
//                               <Link href={'/help'} className='hover:underline hover:text-blue-400
//                               transition-all duration-500'>
//                                     Need Help?
//                               </Link>
//                               <Link href={'/privacy'} className='hover:underline hover:text-blue-400
//                               transition-all duration-500'>
//                                     Privacy
//                               </Link>
//                         </div>
//                   </div>
//             </div>
//       </div>
//   )
// }

// export default page

// import RegisterForm from "@/components/AuthPages/Register-form"
// import ReturnButton from "@/components/return-button"
// import SignInOAuthButton from "@/components/sign-in-oauth-button"
// import Link from "next/link"

// type Props = {
//   searchParams: Promise<{
//     callbackURL?: string
//   }>
// }

// function safeCallback(cb?: string) {
//   const value = cb?.trim()
//   if (!value) return null
//   if (!value.startsWith("/")) return null
//   if (value.startsWith("//")) return null
//   return value
// }

// const page = async ({ searchParams }: Props) => {
//   const sp = await searchParams
//   const callbackURL = safeCallback(sp?.callbackURL)

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-sky-100">
//       <div className="absolute inset-0">
//         <div className="absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-3xl" />
//         <div className="absolute bottom-[-120px] right-[-100px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_30%)]" />
//       </div>

//       <div className="relative px-4 py-10 md:py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
//         <ReturnButton href="/" label="Back to Home" />

//         <div className="mx-auto mt-10 w-full sm:w-[85%] md:w-[72%] lg:w-[52%] xl:w-[42%]">
//           <div
//             className="
//               relative rounded-2xl border border-white/40
//               bg-white/75 px-6 py-10 shadow-2xl shadow-blue-500/10
//               backdrop-blur-xl md:px-8
//             "
//           >
//             <div className="mb-8 text-center">
//               <div className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
//                 Create your account
//               </div>

//               <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
//                 Join PrimePrint
//               </h1>

//               <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
//                 Order printing services, manage projects, save your designs,
//                 and enjoy a faster checkout experience.
//               </p>
//             </div>

//             <RegisterForm callbackURL={callbackURL ?? undefined} />

//             <div className="my-8 flex w-full items-center gap-4">
//               <div className="h-px flex-1 bg-gray-300" />
//               <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
//                 or continue with
//               </span>
//               <div className="h-px flex-1 bg-gray-300" />
//             </div>

//             <div className="mb-8 flex w-full justify-center">
//               <SignInOAuthButton
//                 signUp
//                 provider="google"
//                 callbackURL={callbackURL ?? undefined}
//               />
//             </div>

//             <div className="mt-8 text-center text-sm text-gray-600">
//               Do you already have an account ? {" "}
//               <Link
//                 href={
//                   callbackURL
//                     ? `/login?callbackURL=${encodeURIComponent(callbackURL)}`
//                     : "/login"
//                 }
//                 className="font-medium text-blue-400 hover:text-blue-500 hover:underline transition-all duration-300"
//               >
//                 Login
//               </Link>
//             </div>

//             <div className="mt-8 flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-center text-xs text-gray-500">
//               <span>By continuing, you agree to the</span>
//               <Link
//                 href="/terms"
//                 className="font-medium text-gray-700 transition hover:text-blue-500 hover:underline"
//               >
//                 Terms
//               </Link>
//               <span>and</span>
//               <Link
//                 href="/conditions"
//                 className="font-medium text-gray-700 transition hover:text-blue-500 hover:underline"
//               >
//                 Conditions
//               </Link>
//               <span>and</span>
//               <Link
//                 href="/privacy-policy"
//                 className="font-medium text-gray-700 transition hover:text-blue-500 hover:underline"
//               >
//                 Privacy Policy
//               </Link>
//             </div>

//             <div className="mt-6 flex justify-center gap-4 text-xs font-medium text-gray-500">
//               <Link href="/help" className="transition hover:text-blue-500">
//                 Need Help ?
//               </Link>
//               <Link href="/privacy" className="transition hover:text-blue-500">
//                 Privacy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page

import RegisterForm from "@/components/AuthPages/Register-form"
import ReturnButton from "@/components/return-button"
import SignInOAuthButton from "@/components/sign-in-oauth-button"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react"

type Props = {
  searchParams: Promise<{
    callbackURL?: string
  }>
}

function safeCallback(cb?: string) {
  const value = cb?.trim()
  if (!value) return null
  if (!value.startsWith("/")) return null
  if (value.startsWith("//")) return null
  return value
}

const page = async ({ searchParams }: Props) => {
  const sp = await searchParams
  const callbackURL = safeCallback(sp?.callbackURL)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ReturnButton href="/" label="Back to Home" />

        <div className="mt-8 grid min-h-[calc(100vh-120px)] items-center gap-8 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  PrimePrint Account
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white xl:text-6xl">
                Create your account and manage everything in one place
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 xl:text-lg">
                Access your printing orders, saved designs, project history, and
                checkout faster with a clean and secure customer dashboard.
              </p>

              <div className="mt-10 grid gap-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <div className="rounded-xl bg-cyan-400/10 p-3">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Faster ordering</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Save time on future orders with your profile and saved details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <div className="rounded-xl bg-blue-400/10 p-3">
                    <Truck className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Track projects easily</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Keep your print requests, approvals, and updates organized.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <div className="rounded-xl bg-emerald-400/10 p-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Secure access</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Sign up securely and manage your information with confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  Saved designs
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  Faster checkout
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  Project management
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="rounded-[28px] border border-white/15 bg-white p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Create an account
                </div>

                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  Join PrimePrint
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Order printing services, manage projects, and enjoy a smoother
                  experience on your future orders.
                </p>
              </div>

              <RegisterForm callbackURL={callbackURL ?? undefined} />

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mb-8 flex justify-center">
                <SignInOAuthButton
                  signUp
                  provider="google"
                  callbackURL={callbackURL ?? undefined}
                />
              </div>

              <div className="text-center text-sm text-slate-600">
                Do you already have an account ? {" "}
                <Link
                  href={
                    callbackURL
                      ? `/login?callbackURL=${encodeURIComponent(callbackURL)}`
                      : "/login"
                  }
                  className="font-semibold text-blue-400 hover:text-blue-500 hover:underline transition-all duration-300"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-center text-xs text-slate-500">
                <span>By continuing, you agree to the</span>
                <Link
                  href="/terms"
                  className="font-medium text-slate-700 transition hover:text-blue-500 hover:underline"
                >
                  Terms
                </Link>
                <span>and</span>
                <Link
                  href="/conditions"
                  className="font-medium text-slate-700 transition hover:text-blue-500 hover:underline"
                >
                  Conditions
                </Link>
                <span>and</span>
                <Link
                  href="/privacy-policy"
                  className="font-medium text-slate-700 transition hover:text-blue-500 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>

              <div className="mt-6 flex justify-center gap-4 text-xs font-medium text-slate-500">
                <Link href="/help" className="transition hover:text-blue-500">
                  Need Help ?
                </Link>
                <Link href="/privacy" className="transition hover:text-blue-500">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page