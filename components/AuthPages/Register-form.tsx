"use client"

import { Eye, EyeOff, Mail, User, KeySquare } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signUpEmailAction } from '@/actions/sign-up-email-action'

function safeCallback(cb?: string | null) {
  if (!cb) return "/profile";
  if (!cb.startsWith("/")) return "/profile";
  if (cb.startsWith("//")) return "/profile";
  return cb;
}

type Props = {
  callbackURL?: string;
};

const RegisterForm = ({ callbackURL }: Props) => {

      const [isPending, setPending] = useState(false);
      const [showPassword, setShowPassword] = useState(false);

      const router = useRouter();
      const searchParams = useSearchParams();

      const cb = useMemo(() => safeCallback(callbackURL), [callbackURL]);

      const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            setPending(true);

            try {
                  const formData = new FormData(evt.currentTarget as HTMLFormElement);

                  // ✅ keep callbackURL through the flow
                  formData.set("callbackURL", cb);

                  const { error } = await signUpEmailAction(formData);

                  if (error) {
                  toast.error(error);
                  return;
                  }

                  toast.success("Registration complete. Please verify your email.");

                  // ✅ keep callbackURL in success page too
                  router.push(`/register/success?callbackURL=${encodeURIComponent(cb)}`);
            } catch (e: any) {
                  toast.error(e?.message ?? "Registration failed");
            } finally {
                  setPending(false);
            }

      }

  return (
      <>
            <form className='w-full' onSubmit={handleSubmit}>
                  <div className="w-full">

                        {/* Full Name */}
                        <div className="relative">
                              <User className="absolute top-1.5" />
                              <input
                              name='name'
                              type="text"
                              id="name"
                              className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                              placeholder="Full name"
                              />

                              {/* base line */}
                              <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                              {/* focus line */}
                              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                        </div>

                        {/* Email */}
                        <div className="relative mt-8">
                              <Mail className="absolute top-2" />

                              <input
                              name="email"
                              type="email"
                              id="email"
                              className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                              placeholder="Email"
                              />

                              {/* base line */}
                              <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                              {/* focus line */}
                              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                        </div>

                        {/* Password */}
                        <div className="relative mt-8">
                              <KeySquare className="absolute top-2" />
                              <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              id="password"
                              className="peer w-full bg-transparent pl-9 py-2 pr-10 focus:outline-none"
                              placeholder="Password"
                              />

                              {/* base line */}
                              <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                              {/* focus line */}
                              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />

                              {/* Toggle icon */}
                              <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0 top-2 text-gray-400 hover:text-blue-400 transition"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                              {showPassword ? <EyeOff /> : <Eye />}
                              </button>
                        </div>

                  </div>

                  {/* Submit Button */}
                  <div className="mt-10 w-full block sm:flex items-center gap-3">
                        <Button
                        disabled={isPending}
                        type="submit"
                        className="bg-blue-400 text-white font-semibold px-16 py-7 w-full
                        rounded shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-blue-500 cursor-pointer"
                        >
                              <h5 className='text-center'>{isPending ? "Loading..." : "Sign up"}</h5>
                        </Button>
                  </div>
            </form>
      </>
  )
}

export default RegisterForm
