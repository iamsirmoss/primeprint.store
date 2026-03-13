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

// "use server";

// import { auth, ErrorCode } from "@/lib/auth";
// import { headers } from "next/headers";
// import { APIError } from "better-auth/api";
// import { redirect } from "next/navigation";

// function safeCallback(raw: unknown) {
//   const cb = typeof raw === "string" ? raw : "";
//   // ✅ security: only allow internal paths
//   if (!cb.startsWith("/")) return "/profile";
//   return cb;
// }

// export async function signInEmailAction(formData: FormData) {
//   const email = String(formData.get("email") || "");
//   if (!email) return { error: "Please enter your email.", redirectTo: null as string | null };

//   const password = String(formData.get("password") || "");
//   if (!password) return { error: "Please enter your password.", redirectTo: null as string | null };

//   const callbackURL = safeCallback(formData.get("callbackURL"));

//   try {
//     await auth.api.signInEmail({
//       headers: await headers(),
//       body: { email, password },
//     });

//     // ✅ client will redirect to this
//     return { error: null, redirectTo: callbackURL };
//   } catch (err) {
//     if (err instanceof APIError) {
//       const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

//       switch (errCode) {
//         case "EMAIL_NOT_VERIFIED":
//           // ✅ keep callbackURL so user returns to checkout after verifying
//           redirect(`/auth/verify?error=email_not_verified&callbackURL=${encodeURIComponent(callbackURL)}`);
//         default:
//           return { error: err.message, redirectTo: null };
//       }
//     }

//     return { error: "Internal server error.", redirectTo: null };
//   }
// }

"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { APIError } from "better-auth/api";

import { auth, ErrorCode } from "@/lib/auth";

type SignInActionResult = {
  error: string | null;
  redirectTo: string | null;
};

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ error: "Please enter a valid email address." })
    .max(200, { error: "Email is too long." }),
  password: z
    .string()
    .min(1, { error: "Please enter your password." })
    .max(200, { error: "Password is too long." }),
  callbackURL: z.string().optional(),
});

function safeCallback(raw: unknown, fallback = "/profile") {
  const cb = typeof raw === "string" ? raw.trim() : "";

  if (!cb) return fallback;
  if (!cb.startsWith("/")) return fallback;
  if (cb.startsWith("//")) return fallback;

  return cb;
}

/**
 * Simple in-memory limiter.
 * Bien pour une première protection.
 * En prod multi-instance, remplace par Upstash Redis / DB / edge rate limiter.
 */
const loginAttempts = new Map<
  string,
  { count: number; firstAttemptAt: number; blockedUntil?: number }
>();

const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000; // 15 min

function getClientIp(h: Headers) {
  const xForwardedFor = h.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = h.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

function getRateLimitKey(ip: string, email: string) {
  return `${ip}:${email}`;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, {
      count: 1,
      firstAttemptAt: now,
    });
    return { allowed: true };
  }

  if (record.blockedUntil && now < record.blockedUntil) {
    return {
      allowed: false,
      retryAfterMs: record.blockedUntil - now,
    };
  }

  if (now - record.firstAttemptAt > WINDOW_MS) {
    loginAttempts.set(key, {
      count: 1,
      firstAttemptAt: now,
    });
    return { allowed: true };
  }

  record.count += 1;

  if (record.count > MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_MS;
    loginAttempts.set(key, record);

    return {
      allowed: false,
      retryAfterMs: BLOCK_MS,
    };
  }

  loginAttempts.set(key, record);
  return { allowed: true };
}

function clearRateLimit(key: string) {
  loginAttempts.delete(key);
}

export async function signInEmailAction(
  formData: FormData
): Promise<SignInActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    callbackURL: formData.get("callbackURL"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      error:
        fieldErrors.email?.[0] ||
        fieldErrors.password?.[0] ||
        "Invalid input.",
      redirectTo: null,
    };
  }

  const { email, password, callbackURL } = parsed.data;
  const safeCb = safeCallback(callbackURL);

  const reqHeaders = await headers();
  const ip = getClientIp(reqHeaders);
  const rateLimitKey = getRateLimitKey(ip, email);

  const limit = checkRateLimit(rateLimitKey);

  if (!limit.allowed) {
    return {
      error: "Too many login attempts. Please try again later.",
      redirectTo: null,
    };
  }

  try {
    await auth.api.signInEmail({
      headers: reqHeaders,
      body: {
        email,
        password,
      },
    });

    clearRateLimit(rateLimitKey);

    return {
      error: null,
      redirectTo: safeCb,
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body?.code as ErrorCode | undefined;

      if (errCode === "EMAIL_NOT_VERIFIED") {
        redirect(
          `/auth/verify?error=email_not_verified&callbackURL=${encodeURIComponent(
            safeCb
          )}`
        );
      }

      // Message générique pour éviter de trop aider un attaquant
      return {
        error: "Invalid email or password.",
        redirectTo: null,
      };
    }

    return {
      error: "Internal server error.",
      redirectTo: null,
    };
  }
}
