// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Heart } from "lucide-react";
// import { toast } from "sonner";
// import { addToCart } from "@/lib/cart";
// import { useState } from "react";
// import { RiShoppingCartFill } from "react-icons/ri";

// interface ProductProps {
//   id: string;
//   slug: string;
//   title: string;
//   description: string;
//   price: number;
//   basePriceCents?: number;
//   compareAtPriceCents?: number | null;
//   images: string[];
//   currency: string;
//   stockQty?: number | null;
//   lowStockThreshold?: number | null;
//   sku?: string | null;
//   isActive?: boolean;
//   isFeatured?: boolean;
//   requiresUpload?: boolean;
//   requiresApproval?: boolean;
//   requiresAppointment?: boolean;
//   type?: string;
//   salesChannel?: string;
//   category?: {
//     name: string;
//     slug: string;
//   } | null;
//   service?: {
//     title: string;
//     slug: string;
//   } | null;
//   ratingAverage?: number | null;
//   reviewCount?: number;
// }

// const ProductCard = ({
//   id,
//   slug,
//   title,
//   description,
//   price,
//   images,
//   currency = "USD",
//   stockQty,
//   sku,
//   isActive = true,
// }: ProductProps) => {
//   const [added, setAdded] = useState(false);

//   const resolvedImage =
//     images?.[0] && images[0].startsWith("http")
//       ? images[0]
//       : images?.[0]
//       ? `/images/${images[0]}`
//       : "/images/placeholder.png";

//   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (typeof stockQty === "number" && stockQty <= 0) {
//       toast.error("Out of stock");
//       return;
//     }

//     addToCart({
//       productId: id,
//       slug,
//       sku: sku ?? null,
//       title,
//       price,
//       currency,
//       image: resolvedImage,
//     });

//     toast.success("Product added to cart ✅");

//     setAdded(true);
//     window.setTimeout(() => setAdded(false), 900);
//   };

//   const safeStockQty = stockQty ?? 0;
//   const isOutOfStock = !isActive || safeStockQty <= 0;

//   return (
//     <div className="group border-b p-1.5 relative hover:border-black bg-white transition-all duration-300">
//       <Link href={`/product/${slug}`}>
//         <div className="w-full overflow-hidden flex flex-col items-center justify-center bg-blue-100 h-32 md:h-44">
//           <Image
//             src={resolvedImage}
//             alt={title || "product image"}
//             priority
//             width={500}
//             height={500}
//             className="object-cover w-[35%] sm:w-[40%] md:w-[50%] lg:w-[60%] group-hover:scale-110 transition-all duration-500 ease-in-out h-auto"
//           />
//         </div>

//         <div className="py-6 px-5">
//           <div className="flex justify-between items-center mt-2">
//             <h5 className="text-sm md:text-base capitalize font-semibold text-black">
//               {title}
//             </h5>
//             <Heart size={18} />
//           </div>
//           <p className="text-gray-500 mt-3 text-xs md:text-sm line-clamp-1">
//             {description ?? ""}
//           </p>
//         </div>

//         <div className="flex justify-between gap-2 items-center px-5 pb-4 flex-wrap md:flex-nowrap">
//           <div>
//             <h5 className="mt-2 text-base max-w-fit">
//               {(price / 100).toFixed(2)}{" "}
//               <span className="text-black font-bold text-base">{currency}</span>
//             </h5>

//             {/* {typeof stockQty === "number" && (
//               <p className="mt-1 text-xs text-gray-400">
//                 {stockQty > 0 ? "In stock" : "Out of stock"}
//               </p>
//             )} */}
//           </div>

//           <div>
//             <button
//               type="button"
//               onClick={handleAddToCart}
//               disabled={isOutOfStock}
//               className={`border rounded-2xl py-3 px-6 text-white transition-all duration-300 flex items-center gap-2 justify-center ${
//                 isOutOfStock
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-black hover:bg-black/75 cursor-pointer"
//               }`}
//             >
//               <i>
//                 <RiShoppingCartFill className="text-white text-sm" />
//               </i>
//               <h5 className="text-xs text-white">
//                 {isOutOfStock ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
//               </h5>
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, CheckCircle2, AlertCircle, ShieldCheck, Upload, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { useMemo, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  basePriceCents?: number;
  compareAtPriceCents?: number | null;
  images: string[];
  currency: string;
  stockQty?: number | null;
  lowStockThreshold?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  requiresUpload?: boolean;
  requiresApproval?: boolean;
  requiresAppointment?: boolean;
  type?: string;
  salesChannel?: string;
  category?: {
    name: string;
    slug: string;
  } | null;
  service?: {
    title: string;
    slug: string;
  } | null;
  ratingAverage?: number | null;
  reviewCount?: number;
}

const formatMoney = (amountInCents: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
};

const ProductCard = ({
  id,
  slug,
  title,
  description,
  price,
  compareAtPriceCents,
  images,
  currency = "USD",
  stockQty,
  lowStockThreshold,
  sku,
  isActive = true,
  isFeatured = false,
  requiresUpload = false,
  requiresApproval = false,
  requiresAppointment = false,
  category,
  service,
  ratingAverage = null,
  reviewCount = 0,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);

  const resolvedImage =
    images?.[0] && images[0].startsWith("http")
      ? images[0]
      : images?.[0]
      ? `/images/${images[0]}`
      : "/images/placeholder.png";

  const safeStockQty = stockQty ?? 0;
  const isOutOfStock = !isActive || safeStockQty <= 0;
  const isLowStock =
    typeof stockQty === "number" &&
    typeof lowStockThreshold === "number" &&
    stockQty > 0 &&
    stockQty <= lowStockThreshold;

  const discountPercent = useMemo(() => {
    if (!compareAtPriceCents || compareAtPriceCents <= price) return null;
    return Math.round(((compareAtPriceCents - price) / compareAtPriceCents) * 100);
  }, [compareAtPriceCents, price]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      toast.error("Out of stock");
      return;
    }

    addToCart({
      productId: id,
      slug,
      sku: sku ?? null,
      title,
      price,
      currency,
      image: resolvedImage,
    });

    toast.success("Product added to cart ✅");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <Link
      href={`/product/${slug}`}
      className="group block overflow-hidden rounded-md border border-b-black bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <div className="relative h-56 w-full overflow-hidden bg-gray-50">
          <Image
            src={resolvedImage}
            alt={title || "product image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {isFeatured && (
            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}

          {discountPercent && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{discountPercent}%
            </span>
          )}

          {isOutOfStock && (
            <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.success("Added to wishlist soon ✨");
          }}
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="space-y-4 px-4 py-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category?.name && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                {category.name}
              </span>
            )}
            {service?.title && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                {service.title}
              </span>
            )}
          </div>

          <h3 className="line-clamp-1 text-base font-semibold text-gray-900 md:text-lg">
            {title}
          </h3>

          <p className="line-clamp-2 text-sm text-gray-500">
            {description}
          </p>
        </div>

        {(ratingAverage || reviewCount > 0) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={15} className="fill-current" />
              <span className="font-medium">
                {ratingAverage ? ratingAverage.toFixed(1) : "0.0"}
              </span>
            </div>
            <span>({reviewCount} reviews)</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          {requiresUpload && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <Upload size={13} />
              Upload required
            </span>
          )}

          {requiresApproval && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <ShieldCheck size={13} />
              Approval needed
            </span>
          )}

          {requiresAppointment && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <CalendarDays size={13} />
              Appointment
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">
                {formatMoney(price, currency)}
              </p>

              {compareAtPriceCents && compareAtPriceCents > price && (
                <p className="text-sm text-gray-400 line-through">
                  {formatMoney(compareAtPriceCents, currency)}
                </p>
              )}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-red-500">
                  <AlertCircle size={14} />
                  Out of stock
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-orange-500">
                  <AlertCircle size={14} />
                  Low stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-green-600">
                  <CheckCircle2 size={14} />
                  In stock
                </span>
              )}

              {sku && <span className="text-gray-400">SKU: {sku}</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-all duration-300 ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            <RiShoppingCartFill className="text-sm" />
            {isOutOfStock ? "Unavailable" : added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;