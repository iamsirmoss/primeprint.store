"use client"

import { signIn } from '@/lib/auth-client'
import { Eye, EyeOff, KeySquare, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signInEmailAction } from '@/actions/sign-in-email-action'

const LoginForm = () => {

      const [isPending, setPending] = useState(false);
      const router = useRouter();
      const [showPassword, setShowPassword] = useState(false);

      const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
                  evt.preventDefault();
      
                  setPending(true);
      
                  const formData = new FormData(evt.target as HTMLFormElement);
      
                  const {error} = await signInEmailAction(formData);
      
                  if (error) {
                        toast.error(error);
                        setPending(false);
                  } else {
                        toast.success('Logged in successfully.');
                        router.push('/profile');
                        window.location.href = "/profile";
                  }
      
                  setPending(false);
      
            }

  return (
      <>
            <form className='w-full' onSubmit={handleSubmit}>
                  <div className="w-full">

                        {/* Email */}
                        <div className="relative mt-8">
                              <Mail className="absolute top-2" />
                              <input
                              name='email'
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

                        <div className='mt-6 flex flex-col items-end'>
                              <Link href="/auth/forgot-password" className='text-sm italic text-muted-foreground hover:text-foreground'>
                                    Forgot password ?
                              </Link>
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
                              <h5 className='text-center'>{isPending ? "Loading..." : "Login"}</h5>
                        </Button>
                  </div>
            </form>
      </>
  )
}

export default LoginForm
