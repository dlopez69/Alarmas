const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
  service: "gmail", // O cualquier otro proveedor de correo
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Tu contraseña
  },
});

const enviarCorreoAlarma = (email, descripcion, fecha) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recordatorio de Alarma",
    text: `Tu alarma para ${descripcion} está programada para ${new Date(
      fecha
    ).toLocaleString()}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar correo: ", error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

module.exports = enviarCorreoAlarma;
