// "use server";

// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";

// // ✅ add
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// function stripeCurrency(cur: string) {
//   return (cur || "USD").toLowerCase();
// }

// export async function startStripeCheckoutAction(formData: FormData) {
//   // ✅ get session (user)
//   const sessionAuth = await auth.api.getSession({ headers: await headers() });
//   const userId = sessionAuth?.user?.id;
//   const userEmail = sessionAuth?.user?.email;

//   if (!userId || !userEmail) {
//     throw new Error("You must be logged in to checkout");
//   }

//   const orderId = String(formData.get("orderId") || "");
//   if (!orderId) throw new Error("Missing orderId");

//   const order = await prisma.order.findUnique({
//     where: { id: orderId },
//     select: {
//       id: true,
//       userId: true, // ✅ add
//       status: true,
//       currency: true,
//       paymentRef: true,
//       items: {
//         select: {
//           titleSnapshot: true,
//           quantity: true,
//           unitPriceCents: true,
//           currency: true,
//         },
//       },
//     },
//   });

//   if (!order) throw new Error("Order not found");

//   // ✅ security: order must belong to logged user
//   if (order.userId !== userId) throw new Error("Unauthorized order");

//   if (order.status === "PAID") throw new Error("Order already paid");
//   if (order.status !== "PENDING") throw new Error("Order is not payable");

//   // 🔁 REUSE EXISTING STRIPE SESSION
//   if (order.paymentRef) {
//     try {
//       const existingSession = await stripe.checkout.sessions.retrieve(
//         order.paymentRef
//       );

//       if (existingSession.url) {
//         redirect(existingSession.url);
//       }
//     } catch {
//       // session not found / expired → create new
//     }
//   }

//   // 🆕 CREATE NEW SESSION
//   const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",

//     // ✅ auto-fill email on Stripe Checkout
//     customer_email: userEmail,

//     success_url: `${appUrl}/order/success?orderId=${order.id}`,
//     cancel_url: `${appUrl}/order/${order.id}?canceled=1`,
//     metadata: { orderId: order.id },
//     payment_intent_data: {
//       metadata: { orderId: order.id },
//     },
//     line_items: order.items.map((it) => ({
//       quantity: it.quantity,
//       price_data: {
//         currency: stripeCurrency(it.currency || order.currency),
//         unit_amount: it.unitPriceCents,
//         product_data: {
//           name: it.titleSnapshot,
//         },
//       },
//     })),
//   });

//   await prisma.order.update({
//     where: { id: order.id },
//     data: {
//       paymentProvider: "stripe",
//       paymentRef: session.id,
//     },
//   });

//   if (!session.url) throw new Error("Stripe URL missing");
//   redirect(session.url);
// }

// "use server";

// import Stripe from "stripe";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// function stripeCurrency(cur: string) {
//   return (cur || "USD").toLowerCase();
// }

// export async function startStripeCheckoutAction(formData: FormData) {
//   // ✅ get session (user)
//   const sessionAuth = await auth.api.getSession({ headers: await headers() });
//   const userId = sessionAuth?.user?.id;
//   const userEmail = sessionAuth?.user?.email;

//   if (!userId || !userEmail) {
//     throw new Error("You must be logged in to checkout");
//   }

//   const orderId = String(formData.get("orderId") || "");
//   if (!orderId) throw new Error("Missing orderId");

//   const order = await prisma.order.findUnique({
//     where: { id: orderId },
//     select: {
//       id: true,
//       userId: true,
//       status: true,
//       currency: true,
//       paymentRef: true,
//       items: {
//         select: {
//           titleSnapshot: true,
//           quantity: true,
//           unitPriceCents: true,
//           currency: true,
//         },
//       },
//     },
//   });

//   if (!order) throw new Error("Order not found");
//   if (order.userId !== userId) throw new Error("Unauthorized order");
//   if (order.status === "PAID") throw new Error("Order already paid");
//   if (order.status !== "PENDING") throw new Error("Order is not payable");

//   const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
//   if (!appUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");

//   // 🔁 REUSE EXISTING STRIPE SESSION (note: email won't change if already created)
//   if (order.paymentRef) {
//     try {
//       const existingSession = await stripe.checkout.sessions.retrieve(order.paymentRef);

//       if (existingSession?.url) {
//         redirect(existingSession.url);
//       }
//     } catch {
//       // session not found / expired → create new
//     }
//   }

//   // 🆕 CREATE NEW SESSION
//   const checkoutSession = await stripe.checkout.sessions.create({
//     mode: "payment",

//     // ✅ prefills email (works best on a NEW session)
//     customer_email: userEmail,

//     // ✅ helpful linkage
//     client_reference_id: userId,

//     // ✅ optional
//     customer_creation: "if_required",

//     success_url: `${appUrl}/order/success?orderId=${order.id}`,
//     cancel_url: `${appUrl}/order/${order.id}?canceled=1`,
//     metadata: { orderId: order.id },
//     payment_intent_data: {
//       metadata: { orderId: order.id },
//     },
//     line_items: order.items.map((it) => ({
//       quantity: it.quantity,
//       price_data: {
//         currency: stripeCurrency(it.currency || order.currency),
//         unit_amount: it.unitPriceCents,
//         product_data: { name: it.titleSnapshot },
//       },
//     })),
//   });

//   await prisma.order.update({
//     where: { id: order.id },
//     data: {
//       paymentProvider: "stripe",
//       paymentRef: checkoutSession.id,
//     },
//   });

//   if (!checkoutSession.url) throw new Error("Stripe URL missing");
//   redirect(checkoutSession.url);
// }

"use server";

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

function stripeCurrency(cur: string) {
  return (cur || "USD").toLowerCase();
}

export async function startStripeCheckoutAction(formData: FormData) {
  const sessionAuth = await auth.api.getSession({ headers: await headers() });
  const userId = sessionAuth?.user?.id;
  const userEmail = sessionAuth?.user?.email;

  if (!userId || !userEmail) throw new Error("You must be logged in to checkout");

  const orderId = String(formData.get("orderId") || "");
  if (!orderId) throw new Error("Missing orderId");

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      userId: true,
      status: true,
      currency: true,
      paymentRef: true,
      items: {
        select: {
          titleSnapshot: true,
          quantity: true,
          unitPriceCents: true,
          currency: true,
        },
      },
    },
  });

  if (!order) throw new Error("Order not found");
  if (order.userId !== userId) throw new Error("Unauthorized order");
  if (order.status === "PAID") throw new Error("Order already paid");
  if (order.status !== "PENDING") throw new Error("Order is not payable");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  if (!appUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");

  // ✅ reuse ONLY if it belongs to same order
  if (order.paymentRef) {
    try {
      const existing = await stripe.checkout.sessions.retrieve(order.paymentRef);
      const existingOrderId = String(existing.metadata?.orderId ?? "");
      if (existingOrderId === order.id && existing.url) {
        redirect(existing.url);
      }
    } catch {}
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail,
    client_reference_id: userId,
    success_url: `${appUrl}/order/success?orderId=${order.id}`,
    cancel_url: `${appUrl}/checkout?canceled=1`,
    metadata: { orderId: order.id },
    payment_intent_data: { metadata: { orderId: order.id } },
    line_items: order.items.map((it) => ({
      quantity: it.quantity,
      price_data: {
        currency: stripeCurrency(it.currency || order.currency),
        unit_amount: it.unitPriceCents,
        product_data: { name: it.titleSnapshot },
      },
    })),
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { paymentProvider: "stripe", paymentRef: stripeSession.id },
  });

  if (!stripeSession.url) throw new Error("Stripe URL missing");
  redirect(stripeSession.url);
}
