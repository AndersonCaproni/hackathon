import axios from 'axios';

export async function login(email, senha) {
    try {
        const resposta = await axios.post('http://localhost:5046/api/Geral/Logar', {
            email,
            senha,
        });
       
        if (resposta?.status === 200) {
            localStorage.setItem("token", JSON.stringify(resposta?.data));
        }
        
        return resposta?.data;
    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        throw erro;
    }
}

export async function obterAlunosCompleto(id) {
    try {
        const resposta = await axios.get(`http://localhost:5046/api/Geral/ObterAlunosPorProfessorIdCompleto/${id}`);
        console.log("Obter todos alunos completo: " , resposta)

        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter alunos:", erro);
        throw erro;
    }
}

export async function obterDisciplinaCompleta(id) {
    try {
        console.log(id)
        const resposta = await axios.get(`http://localhost:5046/api/Geral/ObterAlunosEDisciplinaPorProfessor/${id}`);
        console.log("Obter todas as disciplinas: " , resposta)

        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter disciplina:", erro);
        throw erro;
    }
}

export async function obterAluno(id) {
    try {
        const resposta = await axios.get(`http://localhost:5046/api/Geral/ObterAluno/${id}`);
        console.log("Obter um unico aluno: " , resposta )
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter aluno:", erro);
        throw erro;
    }
}