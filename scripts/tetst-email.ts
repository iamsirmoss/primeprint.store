import "dotenv/config";
import nodemailer from "nodemailer";

async function testEmail() {
  console.log("USER:", process.env.NODEMAILER_USER ? "OK" : "MISSING");
  console.log("PASSWORD:", process.env.NODEMAILER_PASSWORD ? "OK" : "MISSING");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful");

    const info = await transporter.sendMail({
      from: `PrimePrint <${process.env.NODEMAILER_USER}>`,
      to: process.env.NODEMAILER_USER,
      subject: "SMTP Test",
      html: "<h2>Email test successful</h2>",
    });

    console.log("📧 Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ SMTP error:", error);
  }
}

testEmail();