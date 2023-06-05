import nodemailer from 'nodemailer'
 const sendConfirmationEmail = async (correo) => {
    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'velozcompany20@gmail.com',
            pass: 'ghkrfgztzgawsrlz'
        },
    });
  
    // Configurar el contenido del correo
    const mailOptions = {
        from: 'velozcompany20@gmail.com',
        to: correo,
        subject: 'Confirmación de registro',
        text: 'Gracias por registrarte. Tu cuenta ha sido creada exitosamente.',
    };
  
    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
  };
  export default sendConfirmationEmail