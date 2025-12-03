"use client"

import { signUp } from '@/lib/auth-client'
import { Eye, EyeOff, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { BsGoogle } from 'react-icons/bs'
import { toast } from 'sonner'

const RegisterForm = () => {

      const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            const formData = new FormData(evt.target as HTMLFormElement);

            const name = String(formData.get('name'));
            if (!name) return toast.error('Please enter your full name.');


            const email = String(formData.get('email'));
            if (!email) return toast.error('Please enter your email.');

            const password = String(formData.get('password'));
            if (!password) return toast.error('Please enter your password.');

            await signUp.email(
                  {
                        name,
                        email,
                        password
                  },
                  {
                        onRequest: () => {},
                        onResponse: () => {},
                        onError: (ctx) => {
                              toast.error(ctx.error.message);
                        },
                        onSuccess: () => {
                              toast.success('Account created successfully. Please check your email to verify your account.');
                        }
                  }
            )
      }

  return (
      <>
            <form className='w-full' onSubmit={handleSubmit}>
                  <div className="w-full">

                        {/* Full Name */}
                        <div className="relative">
                              <User className="absolute top-1.5 text-blue-300" />
                              <input
                              name='name'
                              type="text"
                              id="name"
                              className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
                              hover:border-b-red-500 transition-all duration-300 bg-transparent"
                              placeholder="Full name"
                              />
                        </div>

                        {/* Email */}
                        <div className="relative mt-8">
                              <Mail className="absolute top-[7px] text-blue-300" />
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
                              <EyeOff className="absolute top-1.5 text-blue-300" />
                              <input
                              name='password'
                              type="password"
                              id="password"
                              className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
                              hover:border-b-red-500 transition-all duration-300 bg-transparent"
                              placeholder="******"
                              />
                        </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-10 w-full block sm:flex items-center gap-3">
                        <button
                        type="submit"
                        className="bg-red-500 text-white font-semibold px-16 py-4
                        rounded shadow-md flex items-center gap-2 transition-all duration-300 hover:scale-95 hover:bg-blue-400 cursor-pointer"
                        >
                              <h5 className='text-center'>Sign up</h5>
                        </button>
                        <div className="mt-5 sm:mt-0 flex items-center gap-3">
                              <p className="text-gray-400">
                                    If you already have an account.
                              </p>
                              <Link href={'/login'} className='font-bold text-red-500 hover:text-blue-400 
                              transition-all duration-500'>
                                    Login
                              </Link>
                        </div>
                  </div>
            </form>
            <div className='mt-8 w-full flex flex-col justify-center items-center'>
                  <div className='flex items-center justify-center mt-4 w-full'>
                        <button type='button' 
                        className='flex flex-col justify-center items-center gap-3 py-4 rounded bg-black 
                        hover:bg-black/80 w-full transition-all duration-300 cursor-pointer'>
                              <div className='flex items-center gap-2'>
                                    <BsGoogle className='text-white' />
                                    <p className='font-light text-white'>Connect with Google</p>
                               </div>
                        </button>
                  </div>
            </div>
      </>
  )
}

export default RegisterForm
