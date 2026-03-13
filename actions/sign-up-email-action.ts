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

// "use server";

// import { auth, ErrorCode } from "@/lib/auth";
// import { APIError } from "better-auth/api";

// function safeCallback(raw: unknown) {
//   const cb = typeof raw === "string" ? raw : "";
//   if (!cb.startsWith("/")) return "/profile";
//   return cb;
// }

// export async function signUpEmailAction(formData: FormData) {
//   const name = String(formData.get("name") || "");
//   if (!name) return { error: "Please enter your full name.", redirectTo: null as string | null };

//   const email = String(formData.get("email") || "");
//   if (!email) return { error: "Please enter your email.", redirectTo: null as string | null };

//   const password = String(formData.get("password") || "");
//   if (!password) return { error: "Please enter your password.", redirectTo: null as string | null };

//   const callbackURL = safeCallback(formData.get("callbackURL"));

//   try {
//     await auth.api.signUpEmail({
//       body: { name, email, password },
//     });

//     // ✅ after register, user sees success page,
//     // and that page can send them to login with callbackURL preserved
//     return { error: null, redirectTo: `/register/success?callbackURL=${encodeURIComponent(callbackURL)}` };
//   } catch (err) {
//     if (err instanceof APIError) {
//       const errCode = err.body ? (err.body.code as ErrorCode) : "unknown";

//       switch (errCode) {
//         case "USER_ALREADY_EXISTS":
//           return { error: "A user already exists.", redirectTo: null };
//         default:
//           return { error: err.message, redirectTo: null };
//       }
//     }

//     return { error: "Internal server error.", redirectTo: null };
//   }
// }

"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { z } from "zod";

type SignUpActionResult = {
  error: string | null;
  redirectTo: string | null;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    website?: string[];
  };
};

const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your full name." })
    .max(120, { error: "Name is too long." }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ error: "Please enter a valid email address." })
    .max(200, { error: "Email is too long." }),

  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." })
    .max(200, { error: "Password is too long." }),

  callbackURL: z.string().optional(),

  // honeypot: must stay empty
  website: z
    .string()
    .trim()
    .max(0, { error: "Spam detected." })
    .optional(),
});

function safeCallback(raw: unknown, fallback = "/profile") {
  const cb = typeof raw === "string" ? raw.trim() : "";

  if (!cb) return fallback;
  if (!cb.startsWith("/")) return fallback;
  if (cb.startsWith("//")) return fallback;

  return cb;
}

/**
 * Simple in-memory rate limiter.
 * Good first layer, but use Redis/Upstash in real multi-instance production.
 */
const signUpAttempts = new Map<
  string,
  { count: number; firstAttemptAt: number; blockedUntil?: number }
>();

const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 20 * 60 * 1000; // 20 min

function getClientIp() {
  return "unknown";
}

/**
 * In a Server Action, getting the IP directly is limited.
 * This fallback keeps the code safe, but for stronger protection
 * move rate limiting to a Route Handler / middleware / Redis-backed layer.
 */
function getRateLimitKey(ip: string, email: string) {
  return `${ip}:${email}`;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const record = signUpAttempts.get(key);

  if (!record) {
    signUpAttempts.set(key, {
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
    signUpAttempts.set(key, {
      count: 1,
      firstAttemptAt: now,
    });
    return { allowed: true };
  }

  record.count += 1;

  if (record.count > MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_MS;
    signUpAttempts.set(key, record);

    return {
      allowed: false,
      retryAfterMs: BLOCK_MS,
    };
  }

  signUpAttempts.set(key, record);
  return { allowed: true };
}

function clearRateLimit(key: string) {
  signUpAttempts.delete(key);
}

export async function signUpEmailAction(
  formData: FormData
): Promise<SignUpActionResult> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    callbackURL: formData.get("callbackURL"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      error: "Please correct the errors in the form.",
      redirectTo: null,
      fieldErrors,
    };
  }

  const { name, email, password, callbackURL, website } = parsed.data;
  const safeCb = safeCallback(callbackURL);

  // Honeypot: act like success, do nothing
  if (website && website.length > 0) {
    return {
      error: null,
      redirectTo: `/register/success?callbackURL=${encodeURIComponent(safeCb)}`,
    };
  }

  const ip = getClientIp();
  const rateLimitKey = getRateLimitKey(ip, email);
  const limit = checkRateLimit(rateLimitKey);

  if (!limit.allowed) {
    return {
      error: "Too many signup attempts. Please try again later.",
      redirectTo: null,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    clearRateLimit(rateLimitKey);

    return {
      error: null,
      redirectTo: `/register/success?callbackURL=${encodeURIComponent(safeCb)}`,
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body?.code as ErrorCode | undefined;

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return {
            error: "An account already exists for this email.",
            redirectTo: null,
          };

        default:
          return {
            error: "Unable to complete registration.",
            redirectTo: null,
          };
      }
    }

    return {
      error: "Internal server error.",
      redirectTo: null,
    };
  }
}