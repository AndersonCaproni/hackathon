import axios from "axios";

export const sendTextMessage = async (telefone, mensagem) => {
  try {
    const response = await axios.post(
      "https://v2-api.gzappy.com/message/send-text",
      {
        phone: telefone,
        message: mensagem,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaW5zdGFuY2VfaWQiOiJBRDNYRioqKioqKioqKioqKioqWUZXWVUiLCJleHBpcmVzX2F0IjoiMjAyNi0wNC0zMFQxNToxMzo1MS44MzNaIiwiaWF0IjoxNzQ2MDI2MDMxLCJleHAiOjIzNTA4MjYwMzF9.NVCWkJWxakO7OjniVUzRbe_nHtsmGypp2GrQi0rLAJQ`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response;

    return true;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error
  }
};
