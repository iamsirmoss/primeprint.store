import "server-only";
import "dotenv/config";

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD 
      }
})

export default transporter

// import "server-only";

// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//             user: process.env.NODEMAILER_USER,
//             pass: process.env.NODEMAILER_APP_PASSWORD 
//       }
// })

// export default transporter