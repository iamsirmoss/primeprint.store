import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { UserRole } from "./generated/prisma/enums";
import { ac, roles } from "@/lib/permissions";
import { sendEmailAction } from "@/actions/send-email-action";

export const auth = betterAuth({
      database: prismaAdapter(prisma, {
            provider: "postgresql",
      }),
      socialProviders: {
        google: { 
            clientId: String(process.env.GOOGLE_CLIENT_ID), 
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET), 
        },
        github: { 
            clientId: String(process.env.GITHUB_CLIENT_ID), 
            clientSecret: String(process.env.GITHUB_CLIENT_SECRET), 
        }, 
      },
      emailAndPassword: {    
            enabled: true,
            minPasswordLength: 8,
            autoSignIn: false,
            password: {
                  hash: hashPassword,
                  verify: verifyPassword
            },
            requireEmailVerification: true,
            sendResetPassword: async ({ user, url, }) => {
                  await sendEmailAction({
                        to: user.email,
                        subject: "Reset your password",
                        meta: {
                              description: "Please click the link below to reset your password.",
                              link: url
                        }
                  })
            }
      },
      emailVerification: {
            sendOnSignUp: true,
            autoSignInAfterVerification: true,
            sendVerificationEmail: async ({user, url, }) => {
                  const link = new URL(url)
                  link.searchParams.set("callbackURL", "/auth/verify")

                  await sendEmailAction({
                        to: user.email,
                        subject: "Verify your email address",
                        meta: {
                              description: "Please verify your email address to complete registration.",
                              link: String(link)
                        }
                  })
            }
      },
      hooks: {
            before: createAuthMiddleware(async (ctx) => {
                  if (ctx.path === "/sign-up/email") {
                        const email = String(ctx.body.email);
                        const domain = email.split("@")[1];

                        const VALID_DOMAINS = getValidDomains();
                        if (!VALID_DOMAINS.includes(domain)) {
                              throw new APIError("BAD_REQUEST", {
                                    message: "Invalid domain. Please use an email."
                              });
                        }

                        const name = normalizeName(ctx.body.name);

                        return {
                              context: {
                                    ...ctx,
                                    body: {
                                          ...ctx.body,
                                          name
                                    }
                              }
                        }
                  }
            })
      },
      databaseHooks: {
            user: {
                  create: {
                        before: async (user) => {
                              const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

                              if (user.email && ADMIN_EMAILS.includes(user.email)) {
                                    return { data: { ...user, role: UserRole.ADMIN } };
                              }

                              return { data: user };
                        }
                  }
            }
      },
      user: {
            additionalFields: {
                  role: {
                        type: ["USER", "ADMIN"] as Array<UserRole>,
                        input: false
                  }
            }
      },
      session: {
            expiresIn: 60 * 60 * 24 * 30,
      },
      account: {
            accountLinking: {
                  enabled: false,
            }
      },
      advanced: {
            database: {
                  generateId: false
            }
      },
      plugins: [
            nextCookies(),
            admin({
                  defaultRole: UserRole.USER,
                  adminRoles: [UserRole.ADMIN],
                  ac,
                  roles,
            })
      ]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "unknown";