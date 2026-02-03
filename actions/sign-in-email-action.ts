// "use server"

// import { auth, ErrorCode } from "@/lib/auth";
// import { headers } from "next/headers";
// import { APIError } from "better-auth/api"
// import { redirect } from "next/navigation";

// export async function signInEmailAction(formData: FormData) {
      
//                   const email = String(formData.get('email'));
//                   if (!email) return {error: 'Please enter your email.'};
      
//                   const password = String(formData.get('password'));
//                   if (!password) return {error: 'Please enter your password.'};

//                   try {
//                         await auth.api.signInEmail({
//                               headers: await headers(),
//                               body: {
//                                     email,
//                                     password
//                               },
//                         })

//                         return { error: null };
//                   } catch (err) {
//                         if (err instanceof APIError) {
//                               const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

//                               switch (errCode) {
//                                     case "EMAIL_NOT_VERIFIED":
//                                           redirect("/auth/verify?error=email_not_verified")
//                                     default:
//                                           return { error: err.message };
//                               }
//                         }

//                         return {error: 'Internal server error.'};
//                   }

// }

"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

function safeCallback(raw: unknown) {
  const cb = typeof raw === "string" ? raw : "";
  // ✅ security: only allow internal paths
  if (!cb.startsWith("/")) return "/profile";
  return cb;
}

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  if (!email) return { error: "Please enter your email.", redirectTo: null as string | null };

  const password = String(formData.get("password") || "");
  if (!password) return { error: "Please enter your password.", redirectTo: null as string | null };

  const callbackURL = safeCallback(formData.get("callbackURL"));

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: { email, password },
    });

    // ✅ client will redirect to this
    return { error: null, redirectTo: callbackURL };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          // ✅ keep callbackURL so user returns to checkout after verifying
          redirect(`/auth/verify?error=email_not_verified&callbackURL=${encodeURIComponent(callbackURL)}`);
        default:
          return { error: err.message, redirectTo: null };
      }
    }

    return { error: "Internal server error.", redirectTo: null };
  }
}
