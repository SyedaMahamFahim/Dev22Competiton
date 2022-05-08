const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendEmail = expressAsyncHandler(async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: false,
    requireTLS: true,
    auth: {
      // user: process.env.SMTP_MAIL,
      // pass: process.env.SMTP_PASSWORD,
      user: "work.nashra@gmail.com",
      pass: "myworkaccount@000011112222",
    },
  });

  const { email, subject, message } = req.body;
  var mailOptions = {
    // from: process.env.SMTP_MAIL,
    from: "work.nashra@gmail.com",
    to: `${email}`,
    subject: `${subject}`,
    text: `${message}`,
  };
  // console.log(email, message);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Send...");
    }
  });
});

module.exports = { sendEmail };