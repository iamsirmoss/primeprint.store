// "use server"

// import { auth, ErrorCode } from "@/lib/auth";
// import { APIError } from "better-auth/api"

// export async function signUpEmailAction(formData: FormData) {

//                   const name = String(formData.get('name'));
//                   if (!name) return {error: 'Please enter your full name.'};
      
//                   const email = String(formData.get('email'));
//                   if (!email) return {error: 'Please enter your email.'};
      
//                   const password = String(formData.get('password'));
//                   if (!password) return {error: 'Please enter your password.'};

//                   try {
//                         await auth.api.signUpEmail({
//                               body: {
//                                     name,
//                                     email,
//                                     password
//                               }
//                         })

//                         return { error: null };
//                   } catch (err) {
//                         if (err instanceof APIError) {
//                               const errCode = err.body ? (err.body.code as ErrorCode) : "unknown";

//                               switch (errCode) {
//                                     case "USER_ALREADY_EXISTS":
//                                           return { error: 'A user already exists.' };
//                                     default:
//                                           return { error: err.message };
//                               }
//                         }

//                         return {error: 'Internal server error.'};
//                   }

// }

"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

function safeCallback(raw: unknown) {
  const cb = typeof raw === "string" ? raw : "";
  if (!cb.startsWith("/")) return "/profile";
  return cb;
}

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name") || "");
  if (!name) return { error: "Please enter your full name.", redirectTo: null as string | null };

  const email = String(formData.get("email") || "");
  if (!email) return { error: "Please enter your email.", redirectTo: null as string | null };

  const password = String(formData.get("password") || "");
  if (!password) return { error: "Please enter your password.", redirectTo: null as string | null };

  const callbackURL = safeCallback(formData.get("callbackURL"));

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });

    // ✅ after register, user sees success page,
    // and that page can send them to login with callbackURL preserved
    return { error: null, redirectTo: `/register/success?callbackURL=${encodeURIComponent(callbackURL)}` };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "unknown";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "A user already exists.", redirectTo: null };
        default:
          return { error: err.message, redirectTo: null };
      }
    }

    return { error: "Internal server error.", redirectTo: null };
  }
}
