"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import transporter from "@/lib/nodemailer";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phoneNumber?: string[];
    company?: string[];
    service?: string[];
    description?: string[];
    consent?: string[];
    website?: string[];
  };
};

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "A name is required." })
    .max(100, { error: "The name is too long." }),

  email: z
    .string()
    .trim()
    .email({ error: "Invalid email address." })
    .max(200, { error: "The email address is too long." }),

  phoneNumber: z
    .string()
    .trim()
    .min(6, { error: "The phone number is required." })
    .max(30, { error: "The phone number is too long." }),

  company: z
    .string()
    .trim()
    .max(120, { error: "The company name is too long." })
    .optional(),

  service: z
    .string()
    .trim()
    .min(2, { error: "The subject is required." })
    .max(150, { error: "The subject is too long." }),

  description: z
    .string()
    .trim()
    .max(5000, { error: "The message is too long." })
    .optional(),

  consent: z.string().optional(),

  website: z.string().trim().max(0, { error: "Spam detected." }).optional(),
});

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    company: formData.get("company"),
    service: formData.get("service"),
    description: formData.get("description"),
    consent: formData.get("consent"),
    website: formData.get("website"),
  };

  const validatedFields = contactSchema.safeParse({
    name: typeof rawData.name === "string" ? rawData.name : "",
    email: typeof rawData.email === "string" ? rawData.email : "",
    phoneNumber:
      typeof rawData.phoneNumber === "string" ? rawData.phoneNumber : "",
    company: typeof rawData.company === "string" ? rawData.company : "",
    service: typeof rawData.service === "string" ? rawData.service : "",
    description:
      typeof rawData.description === "string" ? rawData.description : "",
    consent: typeof rawData.consent === "string" ? rawData.consent : undefined,
    website: typeof rawData.website === "string" ? rawData.website : "",
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please correct the errors in the form.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phoneNumber, company, service, description, website } =
    validatedFields.data;

  if (website && website.length > 0) {
    return {
      success: true,
      message: "Your message has been sent successfully.",
      errors: {},
    };
  }

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phoneNumber,
        company: company || null,
        service,
        description: description || null,
      },
    });

    const adminHtml = buildAdminContactEmail({
      name,
      email,
      phoneNumber,
      company: company || "-",
      service,
      description: description || "-",
    });

    const customerHtml = buildCustomerConfirmationEmail({
      name,
      service,
    });

    await transporter.sendMail({
      from: `"Prime Print Store" <${process.env.NODEMAILER_USER}>`,
      to: process.env.NODEMAILER_USER,
      replyTo: email,
      subject: `New contact request: ${service}`,
      text: buildAdminPlainText({
        name,
        email,
        phoneNumber,
        company: company || "-",
        service,
        description: description || "-",
      }),
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"Prime Print Store" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "We received your message",
      text: buildCustomerPlainText({
        name,
        service,
      }),
      html: customerHtml,
    });

    return {
      success: true,
      message: "Your message has been sent successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      success: false,
      message: "An error occurred while sending the message.",
      errors: {},
    };
  }
}

function buildAdminContactEmail(data: {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  service: string;
  description: string;
}) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phoneNumber);
  const safeCompany = escapeHtml(data.company);
  const safeService = escapeHtml(data.service);
  const safeDescription = escapeHtml(data.description).replace(/\n/g, "<br />");

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Contact Request</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6fb;margin:0;padding:0;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
              
              <tr>
                <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:28px 24px;">
                  <div style="font-size:13px;letter-spacing:1.3px;text-transform:uppercase;color:#dbeafe;font-weight:700;">
                    Prime Print Store
                  </div>
                  <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;color:#ffffff;">
                    New Contact Request
                  </h1>
                  <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#eaf2ff;">
                    A new message was submitted through your contact form.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:28px 24px 10px;">
                  <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:18px 18px 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:0 0 12px;font-size:13px;color:#6b7280;width:150px;"><strong>Name</strong></td>
                        <td style="padding:0 0 12px;font-size:15px;color:#111827;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;font-size:13px;color:#6b7280;"><strong>Email</strong></td>
                        <td style="padding:0 0 12px;font-size:15px;color:#111827;">${safeEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;font-size:13px;color:#6b7280;"><strong>Phone</strong></td>
                        <td style="padding:0 0 12px;font-size:15px;color:#111827;">${safePhone}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;font-size:13px;color:#6b7280;"><strong>Company</strong></td>
                        <td style="padding:0 0 12px;font-size:15px;color:#111827;">${safeCompany}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;font-size:13px;color:#6b7280;"><strong>Service</strong></td>
                        <td style="padding:0 0 12px;font-size:15px;color:#111827;">${safeService}</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 24px 8px;">
                  <h2 style="margin:0;font-size:18px;line-height:1.4;color:#111827;">Message</h2>
                </td>
              </tr>

              <tr>
                <td style="padding:0 24px 24px;">
                  <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:18px;font-size:15px;line-height:1.8;color:#374151;">
                    ${safeDescription}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:0 24px;">
                  <div style="height:1px;background:#e5e7eb;"></div>
                </td>
              </tr>

              <tr>
                <td style="padding:20px 24px 28px;text-align:center;">
                  <p style="margin:0;font-size:13px;line-height:1.7;color:#6b7280;">
                    This message was sent from the Prime Print Store website contact form.
                  </p>
                  <p style="margin:6px 0 0;font-size:12px;line-height:1.7;color:#9ca3af;">
                    © ${new Date().getFullYear()} Prime Print Store. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function buildCustomerConfirmationEmail(data: {
  name: string;
  service: string;
}) {
  const safeName = escapeHtml(data.name);
  const safeService = escapeHtml(data.service);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>We received your message</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6fb;margin:0;padding:0;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
              
              <tr>
                <td style="background:linear-gradient(135deg,#111827 0%,#1f2937 100%);padding:30px 24px;text-align:center;">
                  <div style="font-size:13px;letter-spacing:1.3px;text-transform:uppercase;color:#cbd5e1;font-weight:700;">
                    Prime Print Store
                  </div>
                  <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;color:#ffffff;">
                    Thank you for contacting us
                  </h1>
                  <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#e5e7eb;">
                    Your message has been received successfully.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:30px 24px 10px;">
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#374151;">
                    Hello <strong>${safeName}</strong>,
                  </p>
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#374151;">
                    Thank you for reaching out to Prime Print Store. We have received your message and our team will review it as soon as possible.
                  </p>
                  <div style="margin:22px 0;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:18px;">
                    <p style="margin:0 0 8px;font-size:13px;letter-spacing:.4px;text-transform:uppercase;color:#6b7280;font-weight:700;">
                      Subject
                    </p>
                    <p style="margin:0;font-size:16px;line-height:1.7;color:#111827;">
                      ${safeService}
                    </p>
                  </div>
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#374151;">
                    We appreciate your interest and will get back to you shortly.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:0 24px;">
                  <div style="height:1px;background:#e5e7eb;"></div>
                </td>
              </tr>

              <tr>
                <td style="padding:22px 24px 30px;text-align:center;">
                  <p style="margin:0;font-size:15px;line-height:1.8;color:#374151;">
                    Best regards,<br />
                    <strong>Prime Print Store</strong>
                  </p>
                  <p style="margin:14px 0 0;font-size:12px;line-height:1.7;color:#9ca3af;">
                    © ${new Date().getFullYear()} Prime Print Store. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function buildAdminPlainText(data: {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  service: string;
  description: string;
}) {
  return [
    "Prime Print Store",
    "New Contact Request",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phoneNumber}`,
    `Company: ${data.company}`,
    `Service: ${data.service}`,
    "",
    "Message:",
    data.description,
  ].join("\n");
}

function buildCustomerPlainText(data: {
  name: string;
  service: string;
}) {
  return [
    `Hello ${data.name},`,
    "",
    "Thank you for contacting Prime Print Store.",
    "We have received your message and our team will get back to you shortly.",
    "",
    `Subject: ${data.service}`,
    "",
    "Best regards,",
    "Prime Print Store",
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}