import Link from "next/link";
import ClearCartOnSuccess from "./ClearCartOnSuccess";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Payment submitted ✅</h1>
      <p className="mt-3 text-gray-600">
        Thanks! We’re confirming your payment.
      </p>
      <ClearCartOnSuccess />

      {orderId && (
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href={orderId ? `/order/${orderId}` : "/"}
          className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100 transition-all duration-300"
        >
          View order
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-black/75 transition-all duration-300"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
