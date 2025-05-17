// frontend
import axios from 'axios';

export async function login(email, senha) {
    try {
        const resposta = await axios.post('http://localhost:3001/login', {
            email,
            senha,
        });

        if (resposta?.data?.access_token) {
            localStorage.setItem("token", JSON.stringify(resposta?.data));
        }
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        throw erro;
    }
}

export async function obterAlunos(token) {
    try {
        const resposta = await axios.get('http://localhost:3001/alunos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(resposta?.data)
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        throw erro;
    }
}

