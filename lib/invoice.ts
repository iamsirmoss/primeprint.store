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

  drawText("Prime Print Store", 50, 20, true);
  y -= 20;

  drawText("123 Business Street", 50);
  y -= 14;
  drawText("Seattle, WA 98101", 50);
  y -= 14;
  drawText("United States", 50);
  y -= 20;

  drawText("Phone: +1 (206) 000-0000", 50);
  y -= 14;
  drawText("Email: contact@primeprint.store", 50);
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

  page.drawText("If you have any questions, contact contact@primeprint.store", {
    x: 50,
    y: 45,
    size: 9,
    font,
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}