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

        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter alunos:", erro);

        if (erro.response && erro?.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        throw erro;
    }
}

export async function obterAluno(user_id) {
    try {
        const token = JSON.parse(localStorage?.getItem("token"))?.access_token;
        
        const resposta = await axios.get(
            'http://localhost:3001/aluno',
            {
                params: { user_id }, // envia como query string
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter aluno:", erro);

        if (erro.response && erro?.response?.status === 401) {
            //localStorage.removeItem('token');
            //window.location.href = '/login';
        }

        throw erro;
    }
}