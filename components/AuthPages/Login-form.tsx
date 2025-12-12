"use client"

import { signIn } from '@/lib/auth-client'
import { Eye, EyeOff, Mail } from 'lucide-react'
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
                              <Mail className="absolute top-2 text-blue-300" />
                              <input
                              name='email'
                              type="email"
                              id="email"
                              className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
                              hover:border-b-red-500 transition-all duration-300 bg-transparent"
                              placeholder="Email"
                              />
                        </div>

                        {/* Password */}
                        <div className="relative mt-8">
                              <EyeOff className="absolute top-2 text-blue-300" />
                              <input
                              name='password'
                              type="password"
                              id="password"
                              className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
                              hover:border-b-red-500 transition-all duration-300 bg-transparent"
                              placeholder="Password ****"
                              />
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
                        className="bg-red-500 text-white font-semibold px-16 py-7
                        rounded shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-blue-400 cursor-pointer"
                        >
                              <h5 className='text-center'>{isPending ? "Loading..." : "Login"}</h5>
                        </Button>
                        <div className="mt-5 sm:mt-0 flex items-center gap-1">
                              <p className="text-gray-400">
                                    You don&apos;t have an account ?
                              </p>
                              <Link href={'/register'} className='font-semibold hover:text-red-500 text-blue-400 
                              transition-all duration-500'>
                                    Sign up
                              </Link>
                        </div>
                  </div>
            </form>
      </>
  )
}

export default LoginForm
