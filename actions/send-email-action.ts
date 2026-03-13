// "use server";

// import transporter from "@/lib/nodemailer";

// const styles = {
//   container: "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
//   heading: "font-size:20px;color:#333",
//   paragraph: "font-size:16px;",
//   link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
// };

// export async function sendEmailAction({
//   to,
//   subject,
//   meta,
//   attachments,
// }: {
//   to: string;
//   subject: string;
//   meta: { description: string; link?: string };
//   attachments?: Array<{
//     filename: string;
//     content: Buffer;
//     contentType?: string;
//   }>;
// }) {
//   const mailOptions = {
//     from: process.env.NODEMAILER_USER,
//     to,
//     subject: `Prime Print Store - ${subject}`,
//     html: `
//       <div style="${styles.container}">
//         <h1 style="${styles.heading}">${subject}</h1>
//         <p style="${styles.paragraph}">${meta.description}</p>
//         ${meta.link ? `<a href="${meta.link}" style="${styles.link}">View</a>` : ""}
//       </div>
//     `,
//     attachments: attachments?.map((a) => ({
//       filename: a.filename,
//       content: a.content,
//       contentType: a.contentType ?? "application/pdf",
//     })),
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (err) {
//     console.error("sendEmailAction", err);
//     return { success: false };
//   }
// }

"use server";

import transporter from "@/lib/nodemailer";

type SendEmailActionParams = {
  to: string;
  subject: string;
  meta: {
    description: string;
    link?: string;
    title?: string;
    footerNote?: string;
  };
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
};

export async function sendEmailAction({
  to,
  subject,
  meta,
  attachments,
}: SendEmailActionParams) {
  const safeSubject = escapeHtml(subject);
  const safeTitle = escapeHtml(meta.title || "Prime Print Store Notification");
  const safeDescription = escapeHtml(meta.description).replace(/\n/g, "<br />");
  const safeLink = meta.link ? escapeHtml(meta.link) : "";
  const safeFooterNote = escapeHtml(
    meta.footerNote || "Thank you for choosing Prime Print Store."
  );

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${safeSubject}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7fb;margin:0;padding:0;">
        <tr>
          <td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
              
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:32px 24px;text-align:center;">
                  <div style="font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#dbeafe;font-weight:bold;">
                    Prime Print Store
                  </div>
                  <h1 style="margin:12px 0 0;font-size:28px;line-height:1.3;color:#ffffff;">
                    ${safeTitle}
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px 24px 24px;">
                  <h2 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:#111827;">
                    ${safeSubject}
                  </h2>

                  <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#4b5563;">
                    ${safeDescription}
                  </p>

                  ${
                    meta.link
                      ? `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
                      <tr>
                        <td align="center" style="border-radius:10px;background-color:#2563eb;">
                          <a
                            href="${safeLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;"
                          >
                            View Details
                          </a>
                        </td>
                      </tr>
                    </table>
                  `
                      : ""
                  }

                  ${
                    meta.link
                      ? `
                    <div style="margin-top:12px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;">
                      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;">
                        Direct link
                      </p>
                      <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;word-break:break-word;">
                        ${safeLink}
                      </p>
                    </div>
                  `
                      : ""
                  }
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:0 24px;">
                  <div style="height:1px;background:#e5e7eb;"></div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:24px;text-align:center;">
                  <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#6b7280;">
                    ${safeFooterNote}
                  </p>
                  <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
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

  const text = [
    "Prime Print Store",
    "",
    subject,
    "",
    meta.description,
    meta.link ? `\nView Details: ${meta.link}` : "",
    "",
    meta.footerNote || "Thank you for choosing Prime Print Store.",
  ].join("\n");

  const mailOptions = {
    from: `"Prime Print Store" <${process.env.NODEMAILER_USER}>`,
    to,
    subject: `Prime Print Store - ${subject}`,
    html,
    text,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType ?? "application/pdf",
    })),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("sendEmailAction", err);
    return { success: false };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}