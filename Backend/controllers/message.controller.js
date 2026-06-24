const nodemailer = require("nodemailer");
require("dotenv").config();

const sendmessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL,
    subject: "New Portfolio Contact Message",
    text: `${name} says: ${message}`
  });

  res.status(200).json({ message: "Email sent successfully" });
}

module.exports = sendmessage;