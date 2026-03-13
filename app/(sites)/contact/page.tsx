// import { CircleAlert, Facebook, Instagram, Linkedin, Mail, PencilRuler, Phone, Send, User } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const Contact = () => {
//   return (
//       <div className="py-8 md:py-12 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-gray-50 min-h-screen">
//             <hr />
//             <div className="flex items-center gap-4 flex-col py-7 md:py-10">
//                   {/* Contact Info Section */}
//                   <div className="mt-10 w-full lg:w-[55%] order-2">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
//                               Contact us
//                         </h2>
//                         <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">Give us a call or send us an email </p>
//                         <div className="mt-6 space-y-3">
//                               <p className="text-gray-500 text-sm md:text-base">
//                                     <strong>Email :</strong> contact@primeprintstore.com
//                               </p>
//                               <p className="text-gray-500 text-sm md:text-base">
//                                     <strong>Phone number :</strong> +1 6 12 34 56 78
//                               </p>
//                         </div>
//                         <div className='flex items-center gap-2 mt-10'>
//                               <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300'>
//                               <i className='group-hover:text-white text-blue-400'><Instagram className="w-[22px] h-[22px] md:w-7 md:h-7" /></i>
//                               </Link>
//                               <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300'>
//                               <i className='group-hover:text-white text-blue-400'><Facebook className="w-[22px] h-[22px] md:w-7 md:h-7" /></i>
//                               </Link>
//                               <Link href='/' className='group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300'>
//                               <i className='group-hover:text-white text-blue-400'><Linkedin className="w-[22px] h-[22px] md:w-7 md:h-7" /></i>
//                               </Link>
//                         </div>
//                   </div>
//                   {/* Form Section */}
//                   <div className="mt-2 py-8 md:py-12 px-4 md:px-8 w-full lg:w-[60%] mx-auto order-1 bg-white shadow-lg rounded-md">
//                         <form>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                               {/* Full Name */}
//                               <div className="relative">
//                                     <User className="absolute top-1.5 size-5 md:size-6" />
//                                     <input
//                                     type="text"
//                                     id="fullName"
//                                     className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
//                                     placeholder="Name"
//                                     />
//                                     {/* base line */}
//                                     <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                                     {/* focus line */}
//                                     <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//                               </div>

//                               {/* Email */}
//                               <div className="relative">
//                                     <Mail className="absolute top-1.5 size-5 md:size-6" />
//                                     <input
//                                     type="email"
//                                     id="email"
//                                     className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
//                                     placeholder="Email"
//                                     />
//                                     {/* base line */}
//                                     <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                                     {/* focus line */}
//                                     <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//                               </div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
//                               {/* Phone */}
//                               <div className="relative">
//                                     <Phone className="absolute top-1.5 size-5 md:size-6" />
//                                     <input
//                                     type="text"
//                                     id="phone"
//                                     className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
//                                     placeholder="Phone number"
//                                     />
//                                     {/* base line */}
//                                     <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                                     {/* focus line */}
//                                     <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//                               </div>

//                               {/* Sujet */}
//                               <div className="relative">
//                                     <CircleAlert className="absolute top-1.5 size-5 md:size-6" />
//                                     <input
//                                     type="text"
//                                     id="sujet"
//                                     className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
//                                     placeholder="Subject"
//                                     />
//                                     {/* base line */}
//                                     <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                                     {/* focus line */}
//                                     <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//                               </div>
//                         </div>

//                         {/* Message */}
//                         <div className="mt-10 relative">
//                               <PencilRuler className="absolute top-1.5 size-5 md:size-6" />
//                               <textarea
//                               id="message"
//                               rows={2}
//                               className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base text-gray-500"
//                               placeholder="How we can help you ?"
//                               ></textarea>
//                               {/* base line */}
//                                     <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                                     {/* focus line */}
//                                     <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//                         </div>

//                         {/* Submit Button */}
//                         <div className="mt-10 block sm:flex items-center gap-5">
//                               <button
//                               type="submit"
//                               className="bg-red-500 font-semibold px-8 py-3 md:px-12 md:py-4
//                               rounded shadow-md flex items-center gap-2 transition-all duration-500 hover:bg-blue-400 cursor-pointer"
//                               >
//                                     <Send className="text-white size-4 md:size-6" />
//                                     <h5 className="text-white">Send</h5>
//                               </button>
//                               <div className="mt-8 sm:mt-0 flex items-center gap-3">
//                                     <input
//                                           type="checkbox"
//                                     />
//                                     <p className="text-gray-400 text-xs md:text-sm">
//                                           I agree to my data being collected and stored.
//                                     </p>
//                               </div>
//                         </div>
//                         </form>
//                   </div>
//             </div>
//       </div>
//   );
// };

// export default Contact;

"use client";

import {
  Building2,
  CircleAlert,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  PencilRuler,
  Phone,
  Send,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  sendContactForm,
  type ContactFormState,
} from "@/actions/contact-action";

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

const Contact = () => {
  const [state, formAction, isPending] = useActionState(
    sendContactForm,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const lastMessageRef = useRef<string>("");

  useEffect(() => {
    if (!state.message || lastMessageRef.current === state.message) return;

    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }

    lastMessageRef.current = state.message;
  }, [state]);

  return (
    <div className="py-8 md:py-12 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-gray-50 min-h-screen">
      <hr />

      <div className="flex items-center gap-4 flex-col py-7 md:py-10">
        {/* Contact Info Section */}
        <div className="mt-10 w-full lg:w-[55%] order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Contact us
          </h2>

          <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
            Give us a call or send us an email
          </p>

          <div className="mt-6 space-y-3">
            <p className="text-gray-500 text-sm md:text-base">
              <strong>Email :</strong> contact@primeprintstore.com
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              <strong>Phone number :</strong> +1 6 12 34 56 78
            </p>
          </div>

          <div className="flex items-center gap-2 mt-10">
            <Link
              href="/"
              className="group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300"
            >
              <span className="group-hover:text-white text-blue-400">
                <Instagram className="w-[22px] h-[22px] md:w-7 md:h-7" />
              </span>
            </Link>

            <Link
              href="/"
              className="group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300"
            >
              <span className="group-hover:text-white text-blue-400">
                <Facebook className="w-[22px] h-[22px] md:w-7 md:h-7" />
              </span>
            </Link>

            <Link
              href="/"
              className="group bg-white border rounded-xl hover:bg-blue-400 p-3 md:p-6 transition-all duration-300"
            >
              <span className="group-hover:text-white text-blue-400">
                <Linkedin className="w-[22px] h-[22px] md:w-7 md:h-7" />
              </span>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="mt-2 py-8 md:py-12 px-4 md:px-8 w-full lg:w-[60%] mx-auto order-1 bg-white shadow-lg rounded-2xl">
          <form ref={formRef} action={formAction}>
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative">
                <User className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
                  placeholder="Name"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                {state.errors?.name?.[0] && (
                  <p className="mt-2 text-sm text-red-500">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
                  placeholder="Email"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                {state.errors?.email?.[0] && (
                  <p className="mt-2 text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Phone */}
              <div className="relative">
                <Phone className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
                <input
                  type="text"
                  name="phoneNumber"
                  className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
                  placeholder="Phone number"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                {state.errors?.phoneNumber?.[0] && (
                  <p className="mt-2 text-sm text-red-500">
                    {state.errors.phoneNumber[0]}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="relative">
                <CircleAlert className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
                <input
                  type="text"
                  name="service"
                  className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
                  placeholder="Service"
                />
                <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                {state.errors?.service?.[0] && (
                  <p className="mt-2 text-sm text-red-500">
                    {state.errors.service[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="mt-10 relative">
              <Building2 className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
              <input
                type="text"
                name="company"
                className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base"
                placeholder="Company (optional)"
              />
              <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
              {state.errors?.company?.[0] && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.company[0]}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mt-10 relative">
              <PencilRuler className="absolute top-1.5 size-5 md:size-6 text-gray-500" />
              <textarea
                name="description"
                rows={4}
                className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base text-gray-700"
                placeholder="How can we help you?"
              />
              <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
              {state.errors?.description?.[0] && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="mt-8 flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                value="on"
                className="mt-1"
              />
              <p className="text-gray-400 text-xs md:text-sm">
                I agree to my data being collected and stored.
              </p>
            </div>

            {state.errors?.consent?.[0] && (
              <p className="mt-2 text-sm text-red-500">
                {state.errors.consent[0]}
              </p>
            )}

            {state.errors?.website?.[0] && (
              <p className="mt-2 text-sm text-red-500">
                {state.errors.website[0]}
              </p>
            )}

            {/* Submit */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={isPending}
                className="bg-red-500 font-semibold px-8 py-3 md:px-12 md:py-4 rounded-2xl shadow-md flex items-center gap-2 transition-all duration-500 hover:bg-blue-400 cursor-pointer 
                disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="text-white size-4 md:size-6" />
                <span className="text-white">
                  {isPending ? "Sending..." : "Send"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;