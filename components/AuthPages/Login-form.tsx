"use client";

import { Eye, EyeOff, KeySquare, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signInEmailAction } from "@/actions/sign-in-email-action";

function safeCallback(cb: string | null, fallback = "/profile") {
  if (!cb) return fallback;
  if (!cb.startsWith("/")) return fallback;
  if (cb.startsWith("//")) return fallback;
  return cb;
}

const LoginForm = ({
  callbackURL: callbackFromProps,
}: {
  callbackURL?: string;
}) => {
  const [isPending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = useMemo(() => {
    const fromQuery = searchParams.get("callbackURL");
    return safeCallback(callbackFromProps ?? fromQuery, "/profile");
  }, [callbackFromProps, searchParams]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isPending) return;
    setPending(true);

    try {
      const formData = new FormData(evt.currentTarget);
      formData.set("callbackURL", callbackURL);

      const { error, redirectTo } = await signInEmailAction(formData);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Logged in successfully.");

      router.replace(redirectTo || "/profile");
      router.refresh();
      window.location.reload()
    } catch (e: any) {
      toast.error(e?.message ?? "Login failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="callbackURL" value={callbackURL} />

      <div className="w-full">
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
        </div>

        <div className="relative mt-8">
          <KeySquare className="absolute top-2 size-5 md:size-6" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            required
            autoComplete="current-password"
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
        </div>

        <div className="mt-6 flex flex-col items-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm italic text-black hover:text-blue-400 transition-all duration-300"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="mt-10 w-full block sm:flex items-center gap-3">
        <Button
          disabled={isPending}
          type="submit"
          className="bg-blue-400 text-white font-semibold px-16 py-6 w-full rounded-2xl shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-blue-500 cursor-pointer 
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <h5 className="text-center text-white">
            {isPending ? "Loading..." : "Login"}
          </h5>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;