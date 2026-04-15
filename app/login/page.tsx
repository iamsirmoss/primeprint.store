import LoginForm from "@/components/AuthPages/Login-form"
import { MagicLinkLoginForm } from "@/components/magic-link-login-form"
import ReturnButton from "@/components/return-button"
import SignInOAuthButton from "@/components/sign-in-oauth-button"
import Link from "next/link"

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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-100 via-blue-50 to-sky-100">
      <div className="absolute inset-0">
        <div className="absolute left-[-100px] top-[-100px] h-80 w-[320px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_30%)]" />
      </div>

      <div className="relative px-4 py-10 md:py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <ReturnButton href="/" label="Back to Home" />

        <div className="mx-auto mt-10 w-full sm:w-[85%] md:w-[72%] lg:w-[52%] xl:w-[42%]">
          <div
            className="
              relative rounded-2xl border border-white/40
              bg-white/75 px-6 py-10 shadow-2xl shadow-blue-500/10
              backdrop-blur-xl md:px-8
            "
          >
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Sign in
              </div>

              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Welcome back
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
                Sign in to access your orders, saved designs, and enjoy a faster
                checkout experience.
              </p>
            </div>

            <LoginForm callbackURL={callbackURL ?? undefined} />

            <div className="my-8 flex w-full items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="mb-8 flex w-full justify-center">
              <SignInOAuthButton
                provider="google"
                callbackURL={callbackURL ?? undefined}
              />
            </div>

            <MagicLinkLoginForm callbackURL={callbackURL ?? undefined} />

            <div className="mt-8 text-center text-sm text-gray-600">
              You don&apos;t have an account ? {" "}
              <Link
                href={
                  callbackURL
                    ? `/register?callbackURL=${encodeURIComponent(callbackURL)}`
                    : "/register"
                }
                className="font-medium text-blue-400 hover:text-blue-500 hover:underline transition-all duration-300"
              >
                Sign up
              </Link>
            </div>

            <div className="mt-6 flex justify-center gap-4 text-xs font-medium text-gray-500">
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
  )
}

export default page