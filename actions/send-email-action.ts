// "use server"

// import transporter from "@/lib/nodemailer"

// const styles = {
//       container: "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
//       heading: "font-size:20px;color:#333",
//       paragraph: "font-size:16px;",
//       link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
// }

// export async function sendEmailAction({
//       to,
//       subject,
//       meta
// }: {
//       to: string;
//       subject: string;
//       meta : {
//             description: string;
//             link: string
//       }
// }) {
//       const mailOptions = {
//             from: process.env.NODEMAILER_USER,
//             to,
//             subject: `Primeprint.store - ${subject}`,
//             html: `
//             <div style="${styles.container}">
//                   <h1 style="${styles.heading}">${subject}</h1>

//                   <p style="${styles.paragraph}">${meta.description}</p>

//                   <a href="${meta.link}" style="${styles.link}">Click here</a>
//             </div>
//             `,
//       }

//       try {
//             await transporter.sendMail(mailOptions)
//             return { success: true }
//       } catch (err) {
//             console.error("sendEmailAction", err)
//             return { success: false }
//       }
// }

"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;font-family:Arial,sans-serif;",
  heading: "font-size:20px;color:#333;margin-bottom:12px;",
  paragraph: "font-size:16px;color:#555;line-height:1.5;",
  link:
    "display:inline-block;margin-top:20px;padding:12px 18px;background:#000;color:#fff;text-decoration:none;border-radius:4px;font-weight:600;",
  footer: "margin-top:30px;font-size:12px;color:#999;",
};

type SendEmailArgs = {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: SendEmailArgs) {
  const fromEmail = process.env.NODEMAILER_USER;
  const fromName = "PrimePrint";

  const safeLink = meta.link;

  const html = `
    <div style="${styles.container}">
      <h1 style="${styles.heading}">${subject}</h1>

      <p style="${styles.paragraph}">
        ${meta.description}
      </p>

      <a href="${safeLink}" style="${styles.link}">
        Continue
      </a>

      <div style="${styles.footer}">
        If you did not request this email, you can safely ignore it.
      </div>
    </div>
  `;

  const text = `
${subject}

${meta.description}

Open this link:
${safeLink}

If you did not request this email, you can ignore it.
`;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: `PrimePrint – ${subject}`,
    html,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("sendEmailAction error:", err);
    return { success: false };
  }
}
