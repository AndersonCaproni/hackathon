const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

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

const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const response = await axios.post(
      'https://api.unifenas.br/v1/get-token',
      {
        email,
        password: senha,
      },
      {
        httpsAgent: agent,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao autenticar:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      erro: 'Erro ao autenticar na API externa',
      detalhes: error.response?.data || error.message,
    });
  }
});

app.get('/alunos', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // pega o token do header

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const response = await axios.get(
      'https://api.unifenas.br/v1/moodle/usuarios',
      {
        httpsAgent: agent,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // aqui o token é passado
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter usuários:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Erro ao buscar os usuários.',
      details: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        request: {
          method: error.config?.method,
          url: error.config?.url,
          headers: error.config?.headers
        }
      }
    });
  }
});

app.get('/aluno', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { user_id } = req.query; // agora vem da query

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const response = await axios.get(
      'https://api.unifenas.br/v1/moodle/logs-usuario',
      {
        params: { user_id }, // passa o user_id como query string
        httpsAgent: agent,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // aqui o token é passado
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter usuário:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Erro ao buscar os usuários.',
      details: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        request: {
          method: error.config?.method,
          url: error.config?.url,
          headers: error.config?.headers
        }
      }
    });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
