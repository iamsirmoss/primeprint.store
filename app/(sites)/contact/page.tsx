import { CircleAlert, Facebook, Instagram, Linkedin, Mail, PencilRuler, Phone, Send, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
      <div className="py-12 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-gray-50 min-h-screen">
            <hr />
            <div className="flex items-center gap-4 flex-col py-10">
                  {/* Contact Info Section */}
                  <div className="mt-10 w-full lg:w-[55%] order-2">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                              Contact us
                        </h2>
                        <p className="mt-4 text-lg lg:text-xl text-gray-600">Give us a call or send us an email </p>
                        <div className="mt-6 space-y-3">
                              <p className="text-gray-700">
                                    <strong>Email :</strong> contact@primeprintstore.com
                              </p>
                              <p className="text-gray-700">
                                    <strong>Phone number :</strong> +1 6 12 34 56 78
                              </p>
                        </div>
                        <div className='flex items-center gap-2 mt-10'>
                              <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-6 transition-all duration-300'>
                              <i className='group-hover:text-white text-blue-400'><Instagram size={28} /></i>
                              </Link>
                              <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-6 transition-all duration-300'>
                              <i className='group-hover:text-white text-blue-400'><Facebook size={28} /></i>
                              </Link>
                              <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-6 transition-all duration-300'>
                              <i className='group-hover:text-white text-blue-400'><Linkedin size={28} /></i>
                              </Link>
                        </div>
                  </div>
                  {/* Form Section */}
                  <div className="mt-2 py-12 px-8 w-full lg:w-[60%] mx-auto order-1 bg-white shadow-lg rounded-md">
                        <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Full Name */}
                              <div className="relative">
                                    <User className="absolute top-1.5" />
                                    <input
                                    type="text"
                                    id="fullName"
                                    className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                                    placeholder="Name"
                                    />
                                    {/* base line */}
                                    <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                                    {/* focus line */}
                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                                    </div>

                              {/* Email */}
                              <div className="relative">
                                    <Mail className="absolute top-1.5" />
                                    <input
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                              {/* Phone */}
                              <div className="relative">
                                    <Phone className="absolute top-1.5" />
                                    <input
                                    type="text"
                                    id="phone"
                                    className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                                    placeholder="Phone number"
                                    />
                                    {/* base line */}
                                    <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                                    {/* focus line */}
                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                              </div>

                              {/* Sujet */}
                              <div className="relative">
                                    <CircleAlert className="absolute top-1.5" />
                                    <input
                                    type="text"
                                    id="sujet"
                                    className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                                    placeholder="Subject"
                                    />
                                    {/* base line */}
                                    <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                                    {/* focus line */}
                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                              </div>
                        </div>

                        {/* Message */}
                        <div className="mt-10 relative">
                              <PencilRuler className="absolute top-1.5" />
                              <textarea
                              id="message"
                              rows={2}
                              className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
                              placeholder="How we can help you ?"
                              ></textarea>
                              {/* base line */}
                                    <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

                                    {/* focus line */}
                                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10 block sm:flex items-center gap-5">
                              <button
                              type="submit"
                              className="bg-red-500 text-white font-semibold px-8 py-3 md:px-12 md:py-4
                              rounded shadow-md flex items-center gap-2 transition-all duration-500 hover:bg-blue-400 cursor-pointer"
                              >
                                    <Send className="text-white" />
                                    <h5>Send</h5>
                              </button>
                              <div className="mt-8 sm:mt-0 flex items-center gap-3">
                                    <input
                                          type="checkbox"
                                    />
                                    <p className="text-gray-400">
                                          I agree to my data being collected and stored.
                                    </p>
                              </div>
                        </div>
                        </form>
                  </div>
            </div>
      </div>
  );
};

export default Contact;
