const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // O cualquier otro proveedor de correo
  auth: {
    user: "vekinq1@gmail.com", // Tu correo
    pass: "lgdn mgpm mgrr qukz", // Tu contraseña
  },
});

const enviarCorreoAlarma = (email, descripcion, fecha) => {
  const mailOptions = {
    from: "vekinq1@gmail.com",
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
