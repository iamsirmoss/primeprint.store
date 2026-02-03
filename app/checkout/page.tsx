import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";
import Link from "next/link";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    redirect("/login?callbackURL=/checkout");
  }

  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      <div className="">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">Checkout</h1>
            <p className="text-gray-500 mt-2">
              Review your items and proceed to secure payment.
            </p>
          </div>
          <div>
            <Link href="/cart">
              <button className="bg-gray-100 text-gray-800 rounded-md px-4 py-3 shadow hover:bg-gray-300 transition-all duration-300 font-medium cursor-pointer">
                &larr; Back to cart
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <CheckoutClient userEmail={session.user.email ?? ""} />
        </div>
      </div>
    </div>
  );
}
