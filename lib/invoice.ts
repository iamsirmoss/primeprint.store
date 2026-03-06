// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// function money(cents: number, currency: string) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency || "USD",
//     maximumFractionDigits: 2,
//   }).format((cents || 0) / 100);
// }

// export async function generateInvoicePdf(params: {
//   invoiceNumber: string;
//   orderId: string;
//   createdAt: Date;
//   customerEmail: string;
//   currency: string;
//   items: Array<{ title: string; qty: number; unitPriceCents: number; lineTotalCents: number }>;
//   subtotalCents: number;
//   taxCents: number;
//   discountCents: number;
//   totalCents: number;
//   brandName?: string; // ex: PrimePrint
// }) {
//   const brand = params.brandName ?? "PrimePrint";

//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([595.28, 841.89]); // A4
//   const { width, height } = page.getSize();

//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   let y = height - 60;

//   // Header
//   page.drawText(brand, { x: 50, y, size: 20, font: fontBold, color: rgb(0, 0, 0) });
//   y -= 30;

//   page.drawText(`INVOICE #${params.invoiceNumber}`, { x: 50, y, size: 14, font: fontBold });
//   y -= 18;

//   page.drawText(`Order: ${params.orderId}`, { x: 50, y, size: 10, font });
//   y -= 14;

//   page.drawText(`Date: ${params.createdAt.toISOString().slice(0, 10)}`, { x: 50, y, size: 10, font });
//   y -= 14;

//   page.drawText(`Customer: ${params.customerEmail}`, { x: 50, y, size: 10, font });
//   y -= 25;

//   // Table header
//   page.drawText("Item", { x: 50, y, size: 10, font: fontBold });
//   page.drawText("Qty", { x: 340, y, size: 10, font: fontBold });
//   page.drawText("Unit", { x: 390, y, size: 10, font: fontBold });
//   page.drawText("Total", { x: 480, y, size: 10, font: fontBold });
//   y -= 12;

//   page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.85, 0.85, 0.85) });
//   y -= 16;

//   // Items
//   for (const it of params.items) {
//     const title = it.title.length > 55 ? it.title.slice(0, 52) + "..." : it.title;

//     page.drawText(title, { x: 50, y, size: 10, font });
//     page.drawText(String(it.qty), { x: 345, y, size: 10, font });
//     page.drawText(money(it.unitPriceCents, params.currency), { x: 390, y, size: 10, font });
//     page.drawText(money(it.lineTotalCents, params.currency), { x: 480, y, size: 10, font });

//     y -= 16;

//     // simple page break
//     if (y < 180) {
//       y = 180; // (si tu veux multi-page, je te le fais après)
//       break;
//     }
//   }

//   // Totals block
//   y -= 10;
//   page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.85, 0.85, 0.85) });
//   y -= 18;

//   const rightX = 390;

//   page.drawText(`Subtotal:`, { x: rightX, y, size: 10, font });
//   page.drawText(money(params.subtotalCents, params.currency), { x: 480, y, size: 10, font });
//   y -= 14;

//   page.drawText(`Tax:`, { x: rightX, y, size: 10, font });
//   page.drawText(money(params.taxCents, params.currency), { x: 480, y, size: 10, font });
//   y -= 14;

//   page.drawText(`Discount:`, { x: rightX, y, size: 10, font });
//   page.drawText(`-${money(params.discountCents, params.currency)}`, { x: 480, y, size: 10, font });
//   y -= 16;

//   page.drawText(`Total:`, { x: rightX, y, size: 12, font: fontBold });
//   page.drawText(money(params.totalCents, params.currency), { x: 480, y, size: 12, font: fontBold });

//   // Footer
//   page.drawText("Thank you for your order!", { x: 50, y: 60, size: 10, font, color: rgb(0.2, 0.2, 0.2) });

//   const pdfBytes = await pdfDoc.save();
//   return Buffer.from(pdfBytes);
// }

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format((cents || 0) / 100);
}

export async function generateInvoicePdf(params: {
  invoiceNumber: string;
  orderId: string;
  createdAt: Date;
  customerName?: string;
  customerEmail: string;
  currency: string;
  items: Array<{
    title: string;
    qty: number;
    unitPriceCents: number;
    lineTotalCents: number;
  }>;
  subtotalCents: number;
  taxCents: number;
  discountCents: number;
  totalCents: number;
}) {
  const pdf = await PDFDocument.create();

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595;
  const pageHeight = 842;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 60;

  function newPage() {
    page = pdf.addPage([pageWidth, pageHeight]);
    y = pageHeight - 60;
  }

  function drawText(text: string, x: number, size = 10, bold = false) {
    page.drawText(text, {
      x,
      y,
      size,
      font: bold ? fontBold : font,
      color: rgb(0, 0, 0),
    });
  }

  // ======================
  // COMPANY HEADER
  // ======================

  drawText("PrimePrint", 50, 20, true);
  y -= 20;

  drawText("123 Business Street", 50);
  y -= 14;
  drawText("Seattle, WA 98101", 50);
  y -= 14;
  drawText("United States", 50);
  y -= 20;

  drawText("Phone: +1 (206) 000-0000", 50);
  y -= 14;
  drawText("Email: support@primeprint.store", 50);
  y -= 14;
  drawText("Website: www.primeprint.store", 50);

  // ======================
  // INVOICE INFO
  // ======================

  y -= 40;

  drawText(`Invoice #${params.invoiceNumber}`, 50, 14, true);
  y -= 16;

  drawText(`Order ID: ${params.orderId}`, 50);
  y -= 14;

  drawText(`Date: ${params.createdAt.toISOString().slice(0, 10)}`, 50);

  // ======================
  // CUSTOMER
  // ======================

  y -= 30;

  drawText("Bill To:", 50, 12, true);
  y -= 16;

  if (params.customerName) {
    drawText(params.customerName, 50);
    y -= 14;
  }

  drawText(params.customerEmail, 50);

  // ======================
  // TABLE HEADER
  // ======================

  y -= 40;

  drawText("Item", 50, 11, true);
  drawText("Qty", 350, 11, true);
  drawText("Unit", 400, 11, true);
  drawText("Total", 480, 11, true);

  y -= 14;

  page.drawLine({
    start: { x: 50, y },
    end: { x: pageWidth - 50, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 20;

  // ======================
  // ITEMS
  // ======================

  for (const item of params.items) {
    if (y < 120) newPage();

    const title =
      item.title.length > 60 ? item.title.slice(0, 57) + "..." : item.title;

    drawText(title, 50);
    drawText(String(item.qty), 350);
    drawText(money(item.unitPriceCents, params.currency), 400);
    drawText(money(item.lineTotalCents, params.currency), 480);

    y -= 18;
  }

  // ======================
  // TOTALS
  // ======================

  y -= 10;

  page.drawLine({
    start: { x: 350, y },
    end: { x: pageWidth - 50, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 20;

  drawText("Subtotal:", 350);
  drawText(money(params.subtotalCents, params.currency), 480);

  y -= 16;

  drawText("Tax:", 350);
  drawText(money(params.taxCents, params.currency), 480);

  y -= 16;

  drawText("Discount:", 350);
  drawText("-" + money(params.discountCents, params.currency), 480);

  y -= 20;

  drawText("Total:", 350, 12, true);
  drawText(money(params.totalCents, params.currency), 480, 12, true);

  // ======================
  // FOOTER
  // ======================

  page.drawText("Thank you for your order!", {
    x: 50,
    y: 60,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText("If you have any questions, contact support@primeprint.store", {
    x: 50,
    y: 45,
    size: 9,
    font,
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}