const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hunifenas@gmail.com',
      pass: 'mkyt vafk pgjq uqhu', // nunca suba isso em repositórios públicos!
    },
  });

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
          <div style="text-align: center;">
            <img src="cid:logoAzulIcon" alt="Logo" style="max-width: 150px; margin-bottom: 20px;" />
            <h2 style="color: #333;">${subject}</h2>
          </div>
          <p style="font-size: 16px; color: #555;">${text}</p>
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">
            Se você não reconhece o remetente deste e-mail ou acredita que foi enviado por engano,<br>
            por favor, desconsidere esta mensagem.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: 'hunifenas@gmail.com',
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'logoAzulIcon.png',
          path: path.join(__dirname, 'logoAzulIcon.png'),
          cid: 'logoAzulIcon',
        },
      ],
    });

    res.status(200).send('Email enviado!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar o email.');
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
