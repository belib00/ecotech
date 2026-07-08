import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "SEU_USER_DO_MAILTRAP", 
    pass: "SUA_PASSWORD_DO_MAILTRAP" 
  }
});

export default transporter;