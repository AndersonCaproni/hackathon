import axios from 'axios';

export const sendEmail = async (email, titulo, mensagem, emailProf) => {
  try {
    await axios.post('http://localhost:3001/send-email', {
      to: email,
      subject: titulo,
      text: mensagem,
      email: emailProf
    });
    return true
  } catch (err) {
    console.error(err);
    throw err
  }
};
