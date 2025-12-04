"use server"

import { auth } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {

                  const name = String(formData.get('name'));
                  if (!name) return {error: 'Please enter your full name.'};
      
                  const email = String(formData.get('email'));
                  if (!email) return {error: 'Please enter your email.'};
      
                  const password = String(formData.get('password'));
                  if (!password) return {error: 'Please enter your password.'};

                  try {
                        await auth.api.signUpEmail({
                              body: {
                                    name,
                                    email,
                                    password
                              }
                        })

                        return { error: null };
                  } catch (err) {
                        if (err instanceof Error) {
                              return { error: "Oups! Something went wrong while registering." };
                        }

                        return {error: 'Internal server error.'};
                  }

}