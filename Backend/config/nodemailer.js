import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharmashekhar2005024@gmail.com",
    pass: "aqok ktzj hhyn jtzs",
  },
});
