import CartClient from "@/components/CartPage/CartClient";

export default function CartPage() {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] h-screen">
      <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">Your Cart</h1>
      <hr className="mt-4" />
      <CartClient />
    </div>
  );
}
