// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs"; // important
// export const dynamic = "force-dynamic";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// export async function POST(req: Request) {
//   const sig = req.headers.get("stripe-signature");
//   if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

//   const body = await req.text();

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: `Webhook Error: ${err.message}` },
//       { status: 400 }
//     );
//   }

//   try {
//     // ✅ Payment completed
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       const orderId = session.metadata?.orderId;
//       const paymentRef = session.id;

//       if (!orderId) {
//         return NextResponse.json({ received: true, warning: "No orderId metadata" });
//       }

//       const existing = await prisma.order.findUnique({
//         where: { id: orderId },
//         select: { status: true },
//       });

//       // ✅ already paid? ignore
//       if (existing?.status === "PAID") {
//         return NextResponse.json({ received: true, ignored: "already_paid" });
//       }

//       await prisma.order.update({
//         where: { id: orderId },
//         data: {
//           status: "PAID",
//           paidAt: new Date(),
//           paymentProvider: "stripe",
//           paymentRef,
//         },
//       });
//     }

//     // (optionnel) gérer refund / cancel plus tard

//     return NextResponse.json({ received: true });
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e?.message ?? "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }

// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs"; // important
// export const dynamic = "force-dynamic";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// export async function POST(req: Request) {
//   const sig = req.headers.get("stripe-signature");
//   if (!sig) {
//     return NextResponse.json({ error: "Missing signature" }, { status: 400 });
//   }

//   const body = await req.text();

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: `Webhook Error: ${err.message}` },
//       { status: 400 }
//     );
//   }

//   try {
//     // ✅ Payment completed
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       const orderId = session.metadata?.orderId;
//       const paymentRef = session.id;

//       if (!orderId) {
//         return NextResponse.json({
//           received: true,
//           warning: "No orderId metadata",
//         });
//       }

//       await prisma.$transaction(async (tx) => {
//         const order = await tx.order.findUnique({
//           where: { id: orderId },
//           select: {
//             id: true,
//             status: true,
//             items: {
//               select: {
//                 type: true,
//                 quantity: true,
//                 productId: true,
//               },
//             },
//           },
//         });

//         // ✅ if order not found, just return (avoid retry storms)
//         if (!order) return;

//         // ✅ idempotent: already paid => ignore
//         if (order.status === "PAID") return;

//         // ✅ group product quantities (in case same product appears multiple lines)
//         const qtyByProductId = new Map<string, number>();

//         for (const it of order.items) {
//           if (it.type !== "PRODUCT") continue;
//           if (!it.productId) continue;

//           qtyByProductId.set(
//             it.productId,
//             (qtyByProductId.get(it.productId) ?? 0) + it.quantity
//           );
//         }

//         // ✅ 1) decrement stock first (atomic, prevents negative stock)
//         for (const [productId, qty] of qtyByProductId.entries()) {
//           const updated = await tx.product.updateMany({
//             where: {
//               id: productId,
//               isActive: true,
//               stockQty: { gte: qty },
//             },
//             data: {
//               stockQty: { decrement: qty },
//             },
//           });

//           // If no row updated => not enough stock => rollback transaction
//           if (updated.count === 0) {
//             throw new Error(`Stock insufficient for product ${productId}`);
//           }
//         }

//         // ✅ 2) optional: if stock hits 0 => disable product
//         for (const productId of qtyByProductId.keys()) {
//           const p = await tx.product.findUnique({
//             where: { id: productId },
//             select: { stockQty: true },
//           });

//           if (typeof p?.stockQty === "number" && p.stockQty <= 0) {
//             await tx.product.update({
//               where: { id: productId },
//               data: { isActive: false },
//             });
//           }
//         }

//         // ✅ 3) finally mark order paid (only if stock decrement succeeded)
//         await tx.order.update({
//           where: { id: orderId },
//           data: {
//             status: "PAID",
//             paidAt: new Date(),
//             paymentProvider: "stripe",
//             paymentRef,
//           },
//         });
//       });
//     }

//     // (optionnel) gérer refund / cancel plus tard
//     return NextResponse.json({ received: true });
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e?.message ?? "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }

// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// export async function POST(req: Request) {
//   const sig = req.headers.get("stripe-signature");
//   if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

//   const body = await req.text();

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err: any) {
//     return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
//   }

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       // ✅ get orderId from session.metadata
//       let orderId = session.metadata?.orderId;
//       const paymentRef = session.id;

//       // ✅ fallback: get from payment_intent metadata
//       if (!orderId && session.payment_intent) {
//         const pi = await stripe.paymentIntents.retrieve(String(session.payment_intent));
//         orderId = pi.metadata?.orderId;
//       }

//       if (!orderId) {
//         return NextResponse.json({ received: true, warning: "No orderId metadata" });
//       }

//       await prisma.$transaction(async (tx) => {
//         const order = await tx.order.findUnique({
//           where: { id: orderId },
//           select: {
//             id: true,
//             status: true,
//             items: { select: { type: true, quantity: true, productId: true } },
//           },
//         });

//         if (!order) return;
//         if (order.status === "PAID") return;

//         await tx.order.update({
//           where: { id: orderId },
//           data: {
//             status: "PAID",
//             paidAt: new Date(),
//             paymentProvider: "stripe",
//             paymentRef,
//           },
//         });

//         for (const it of order.items) {
//           if (it.type !== "PRODUCT") continue;
//           if (!it.productId) continue;

//           const updated = await tx.product.updateMany({
//             where: { id: it.productId, isActive: true, stockQty: { gte: it.quantity } },
//             data: { stockQty: { decrement: it.quantity } },
//           });

//           if (updated.count === 0) continue;

//           const p = await tx.product.findUnique({
//             where: { id: it.productId },
//             select: { stockQty: true },
//           });

//           if (typeof p?.stockQty === "number" && p.stockQty <= 0) {
//             await tx.product.update({
//               where: { id: it.productId },
//               data: { isActive: false },
//             });
//           }
//         }
//       });
//     }

//     return NextResponse.json({ received: true });
//   } catch (e: any) {
//     return NextResponse.json({ error: e?.message ?? "Webhook handler failed" }, { status: 500 });
//   }
// }

// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-12-15.clover",
// });

// async function resolveOrderIdFromSession(session: Stripe.Checkout.Session) {
//   // 1) metadata orderId
//   let orderId = session.metadata?.orderId;

//   // 2) fallback: payment_intent metadata
//   if (!orderId && session.payment_intent) {
//     const pi = await stripe.paymentIntents.retrieve(
//       String(session.payment_intent)
//     );
//     orderId = pi.metadata?.orderId;
//   }

//   return orderId || null;
// }

// export async function POST(req: Request) {
//   const sig = req.headers.get("stripe-signature");
//   if (!sig) {
//     return NextResponse.json({ error: "Missing signature" }, { status: 400 });
//   }

//   const body = await req.text();
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: `Webhook Error: ${err.message}` },
//       { status: 400 }
//     );
//   }

//   try {
//     // =========================
//     // ✅ 1) PAYMENT COMPLETED
//     // =========================
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       const orderId = await resolveOrderIdFromSession(session);
//       const paymentRef = session.id;

//       if (!orderId) {
//         return NextResponse.json({
//           received: true,
//           warning: "No orderId metadata",
//         });
//       }

//       await prisma.$transaction(async (tx) => {
//         const order = await tx.order.findUnique({
//           where: { id: orderId },
//           select: {
//             id: true,
//             status: true,
//             items: { select: { type: true, quantity: true, productId: true } },
//           },
//         });

//         if (!order) return;

//         // ✅ idempotent guards
//         if (order.status === "PAID") return;
//         if (order.status === "CANCELED") return;

//         // 1) mark paid
//         await tx.order.update({
//           where: { id: orderId },
//           data: {
//             status: "PAID",
//             paidAt: new Date(),
//             paymentProvider: "stripe",
//             paymentRef,
//           },
//         });

//         // 2) decrement stock for PRODUCT items only
//         for (const it of order.items) {
//           if (it.type !== "PRODUCT") continue;
//           if (!it.productId) continue;

//           const updated = await tx.product.updateMany({
//             where: {
//               id: it.productId,
//               isActive: true,
//               stockQty: { gte: it.quantity },
//             },
//             data: {
//               stockQty: { decrement: it.quantity },
//             },
//           });

//           // if no row updated => stock issue (optional handling)
//           if (updated.count === 0) continue;

//           // if stock <= 0 => deactivate product
//           const p = await tx.product.findUnique({
//             where: { id: it.productId },
//             select: { stockQty: true },
//           });

//           if (typeof p?.stockQty === "number" && p.stockQty <= 0) {
//             await tx.product.update({
//               where: { id: it.productId },
//               data: { isActive: false },
//             });
//           }
//         }
//       });

//       return NextResponse.json({ received: true });
//     }

//     // =========================
//     // ✅ 2) CHECKOUT EXPIRED => CANCELED
//     // =========================
//     if (event.type === "checkout.session.expired") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       const orderId = await resolveOrderIdFromSession(session);
//       if (!orderId) {
//         return NextResponse.json({
//           received: true,
//           warning: "No orderId metadata (expired)",
//         });
//       }

//       await prisma.$transaction(async (tx) => {
//         const order = await tx.order.findUnique({
//           where: { id: orderId },
//           select: { id: true, status: true },
//         });

//         if (!order) return;

//         // ✅ idempotent guards
//         if (order.status === "PAID") return;
//         if (order.status === "CANCELED") return;

//         // ✅ only cancel if still pending
//         if (order.status === "PENDING") {
//           await tx.order.update({
//             where: { id: orderId },
//             data: {
//               status: "CANCELED",
//               paymentProvider: "stripe",
//               paymentRef: session.id, // optional (trace)
//             },
//           });
//         }
//       });

//       return NextResponse.json({ received: true });
//     }

//     // Other events ignored for now
//     return NextResponse.json({ received: true, ignored: event.type });
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e?.message ?? "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }


import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInvoicePdf } from "@/lib/invoice";
import { sendEmailAction } from "@/actions/send-email-action";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

function makeInvoiceNumber(orderId: string) {
  // simple: INV-YYYY-xxxxx
  const short = orderId.slice(-6).toUpperCase();
  const year = new Date().getFullYear();
  return `INV-${year}-${short}`;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    // =========================================================
    // 1) PAID + stock decrement
    // =========================================================
    if (event.type === "checkout.session.completed") {
  console.log("=== checkout.session.completed received ===");

  const session = event.data.object as Stripe.Checkout.Session;

  let orderId = session.metadata?.orderId;
  const paymentRef = session.id;

  console.log("Session ID:", session.id);
  console.log("Session metadata:", session.metadata);

  if (!orderId && session.payment_intent) {
    const pi = await stripe.paymentIntents.retrieve(String(session.payment_intent));
    orderId = pi.metadata?.orderId;
    console.log("Fallback PI metadata:", pi.metadata);
  }

  console.log("Resolved orderId:", orderId);

  if (!orderId) {
    console.log("No orderId found in metadata");
    return NextResponse.json({ received: true, warning: "No orderId metadata" });
  }

  console.log("Starting PAID transaction...");

  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId! },
      select: {
        id: true,
        status: true,
        paymentRef: true,
      },
    });

    console.log("Order before update:", order);

    if (!order) return;
    if (order.status === "PAID") {
      console.log("Order already PAID, skipping");
      return;
    }

    await tx.order.update({
      where: { id: orderId! },
      data: {
        status: "PAID",
        paidAt: new Date(),
        paymentProvider: "stripe",
        paymentRef,
      },
    });

    console.log("Order updated to PAID");

    const items = await tx.orderItem.findMany({
      where: { orderId: orderId! },
      select: { type: true, quantity: true, productId: true },
    });

    console.log("Order items:", items);

    for (const it of items) {
      if (it.type !== "PRODUCT") continue;
      if (!it.productId) continue;

      const updated = await tx.product.updateMany({
        where: { id: it.productId, isActive: true, stockQty: { gte: it.quantity } },
        data: { stockQty: { decrement: it.quantity } },
      });

      console.log("Stock decrement result:", updated);

      if (updated.count === 0) continue;

      const p = await tx.product.findUnique({
        where: { id: it.productId },
        select: { stockQty: true },
      });

      console.log("Product after decrement:", p);

      if (typeof p?.stockQty === "number" && p.stockQty <= 0) {
        await tx.product.update({
          where: { id: it.productId },
          data: { isActive: false },
        });
        console.log("Product disabled because stock <= 0");
      }
    }
  });

  console.log("PAID transaction complete");

  const orderFull = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      createdAt: true,
      currency: true,
      subtotalCents: true,
      taxCents: true,
      discountCents: true,
      totalCents: true,
      invoiceSentAt: true,
      invoiceNumber: true,
      user: { select: { email: true, name: true } },
      items: {
        select: {
          quantity: true,
          unitPriceCents: true,
          titleSnapshot: true,
          currency: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  console.log("orderFull:", orderFull);

  if (orderFull?.status === "PAID" && !orderFull.invoiceSentAt && orderFull.user?.email) {
    const invoiceNumber = orderFull.invoiceNumber ?? makeInvoiceNumber(orderFull.id);

    const customerEmail = orderFull.user.email;
    const customerName = orderFull.user.name ?? "Customer";

    console.log("Generating PDF...");
    const pdf = await generateInvoicePdf({
      customerName,
      invoiceNumber,
      orderId: orderFull.id,
      createdAt: orderFull.createdAt,
      customerEmail,
      currency: orderFull.currency,
      items: orderFull.items.map((it) => ({
        title: it.titleSnapshot,
        qty: it.quantity,
        unitPriceCents: it.unitPriceCents,
        lineTotalCents: it.unitPriceCents * it.quantity,
      })),
      subtotalCents: orderFull.subtotalCents,
      taxCents: orderFull.taxCents,
      discountCents: orderFull.discountCents,
      totalCents: orderFull.totalCents,
    });
    console.log("PDF generated");

    await prisma.order.update({
      where: { id: orderFull.id },
      data: {
        invoiceNumber,
        invoiceSentAt: new Date(),
      },
    });

    console.log("Order invoice fields updated");

    console.log("Sending email...");
    await sendEmailAction({
      to: customerEmail,
      subject: "Payment confirmed ✅",
      meta: {
        description: `Hi ${customerName}, your payment has been confirmed. Your invoice is attached.`,
        link: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?orderId=${orderFull.id}`,
      },
      attachments: [
        {
          filename: `invoice-${invoiceNumber}.pdf`,
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    });
    console.log("Email sent");
  } else {
    console.log("Skipping invoice/email block");
  }
}

    // =========================================================
    // 3) SESSION EXPIRED => CANCELED (if still pending)
    // =========================================================
    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      let orderId = session.metadata?.orderId;

      if (!orderId && session.payment_intent) {
        const pi = await stripe.paymentIntents.retrieve(String(session.payment_intent));
        orderId = pi.metadata?.orderId;
      }

      if (orderId) {
        await prisma.order.updateMany({
          where: { id: orderId, status: "PENDING" },
          data: { status: "CANCELED" },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
  console.error("STRIPE WEBHOOK ERROR:", e);
  return NextResponse.json(
    { error: e?.message ?? "Webhook handler failed" },
    { status: 500 }
  );
  }
}