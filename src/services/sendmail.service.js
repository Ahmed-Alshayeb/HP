import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: ` Ahmed Alshayeb 👋 <${process.env.USER_GMAIL}>`,
    to,
    subject: subject ? subject : "Verification Email",
    html: html,
  });

  if (info.accepted.length) {
    return true;
  }
  return false;
};
