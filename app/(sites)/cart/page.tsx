import CartClient from "@/components/CartPage/CartClient";

export default function CartPage() {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <CartClient />
    </div>
  );
}
