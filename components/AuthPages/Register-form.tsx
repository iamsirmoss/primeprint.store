"use client";

import { Eye, EyeOff, Mail, User, KeySquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signUpEmailAction } from "@/actions/sign-up-email-action";

function safeCallback(cb?: string | null) {
  if (!cb) return "/profile";
  if (!cb.startsWith("/")) return "/profile";
  if (cb.startsWith("//")) return "/profile";
  return cb;
}

type Props = {
  callbackURL?: string;
};

const RegisterForm = ({ callbackURL }: Props) => {
  const [isPending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
    website?: string[];
  }>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  const cb = useMemo(() => {
    const fromQuery = searchParams.get("callbackURL");
    return safeCallback(callbackURL ?? fromQuery);
  }, [callbackURL, searchParams]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isPending) return;

    setPending(true);
    setFieldErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      formData.set("callbackURL", cb);

      const result = await signUpEmailAction(formData);

      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Registration complete. Please verify your email.");
      router.push(result.redirectTo || `/register/success?callbackURL=${encodeURIComponent(cb)}`);
    } catch (e: any) {
      toast.error(e?.message ?? "Registration failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="callbackURL" value={cb} />

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="w-full">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute top-1.5 size-5 md:size-6" />
          <input
            name="name"
            type="text"
            id="name"
            required
            autoComplete="name"
            maxLength={120}
            className="peer w-full bg-transparent pl-8 md:pl-9 py-2 focus:outline-none text-base placeholder-gray-400"
            placeholder="Full name"
          />
          <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
          {fieldErrors.name?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative mt-8">
          <Mail className="absolute top-2 size-5 md:size-6" />
          <input
            name="email"
            type="email"
            id="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            className="peer w-full bg-transparent pl-8 md:pl-9 py-2 focus:outline-none text-base placeholder-gray-400"
            placeholder="Email"
          />
          <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
          {fieldErrors.email?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mt-8">
          <KeySquare className="absolute top-2 size-5 md:size-6" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            required
            autoComplete="new-password"
            minLength={8}
            maxLength={200}
            className="peer w-full bg-transparent pl-8 md:pl-9 py-2 pr-10 focus:outline-none text-base placeholder-gray-400"
            placeholder="Password"
          />
          <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-2 text-gray-400 hover:text-blue-400 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-5 md:size-6" />
            ) : (
              <Eye className="size-5 md:size-6" />
            )}
          </button>

          {fieldErrors.password?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.password[0]}</p>
          )}
        </div>
      </div>

      <div className="mt-10 w-full block sm:flex items-center gap-3">
        <Button
          disabled={isPending}
          type="submit"
          className="bg-blue-400 text-white fontmedium px-16 py-6 w-full rounded-xl shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-blue-500 cursor-pointer 
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <h5 className="text-center text-white">
            {isPending ? "Loading..." : "Sign up"}
          </h5>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;