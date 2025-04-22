import React, { useState } from 'react';
import axios from 'axios';

export async function LlamaChat(aluno, tentativa = 1) {
    try {

        const data = `Você é uma inteligência artificial especializada em análise de evasão escolar e deve responder como um gerador de JSON, sem nenhuma explicação adicional.

        Você receberá a seguir um JSON com dados de um aluno.

        Considere que a data atual é ${new Date().toLocaleDateString('pt-BR')} e leve isso em conta nas suas análises e cálculos.
        
        Sua tarefa é retornar exatamente o seguinte objeto JSON, com os valores calculados com base nos dados recebidos:
        
        {
          "PossibilidadeDeEvasao": "valor como número (sem o símbolo de %)",
          "MotivoPrincipal": "texto explicativo aqui, com todos os detalhes possíveis, sem economizar palavras",
          "DistribuicaoMotivo": [
            {
              "motivo": "motivo 1",
              "porcentagem": "valor como número (sem %)"
            },
            {
              "motivo": "motivo 2",
              "porcentagem": "valor como número (sem %)"
            },
            {
            ** adicione mais motivos aqui, se necessário **
            }
          ],
          "Recomendacao": "ação recomendada como uma das seguintes opções: Encaminhar para orientação pedagógica, Monitoramento padrão ou Contato imediato com responsável"
        }
        
        ⚠️ Regras obrigatórias:
        - A resposta deve conter **somente** o JSON acima.
        - **Não adicione explicações, comentários ou texto fora do JSON**.
        - A saída será validada com JSON.parse(). Qualquer texto fora do JSON irá gerar erro.
        - Utilize aspas duplas em todas as chaves e valores conforme o padrão JSON.
        
        Dados do aluno:
        ${JSON.stringify(aluno)}
        `;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-3-70b-instruct',
                messages: [
                    {
                        role: 'user',
                        content: data,
                    },
                ],
            },
            {
                headers: {
                    Authorization: 'Bearer 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',
                    'Content-Type': 'application/json',
                },
            }
        );
        
        const respostaTexto = response.data.choices[0].message.content;

        if (!validarRespostaLlama(respostaTexto)) {
            console.log("⚠️ Resposta inválida:", respostaTexto);
            if (tentativa < 3) {
                console.warn(`⚠️ Resposta inválida - Tentativa ${tentativa}. Reenviando...`);
                return await LlamaChat(aluno, tentativa + 1);
            } else {
                throw new Error("❌ A IA retornou 3 respostas inválidas seguidas.");
            }
        }

        return JSON.parse(respostaTexto);

    } catch (erro) {
        console.error('Erro ao consultar LiaMA:', erro);
        throw erro;
    }
};

export async function ChatMensagem(pergunta) {
    try {

        const data = `${JSON.stringify(pergunta)} - RESPONDA SEMPRE MINHA ÚLTIMA PERGUNTA, PORÉM LEVE EM CONTA TODAS AS OUTRAS PERGUNTAS E RESPOSTA QUE EXISTEM NA LISTA ( IMPORTANET, EU QUERO APENAS A RESPOSTA COM SERIA NORMALMENTE, NÃO PRECISA CONTEXTUALIZAR)`
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-3-70b-instruct',
                messages: [
                    {
                        role: 'user',
                        content: data,
                    },
                ],
            },
            {
                headers: {
                    Authorization: 'Bearer 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',
                    'Content-Type': 'application/json',
                },
            }
        );
        
        const respostaTexto = response.data.choices[0].message.content;

        return respostaTexto;

    } catch (erro) {
        console.error('Erro ao consultar LiaMA:', erro);
        throw erro
    }
};

function validarRespostaLlama(respostaTexto) {
    try {
        const json = JSON.parse(respostaTexto);

        if (
            typeof json.PossibilidadeDeEvasao !== 'number' &&
            isNaN(Number(json.PossibilidadeDeEvasao))
        ) return false;

        if (typeof json.MotivoPrincipal !== 'string') return false;

        if (!Array.isArray(json.DistribuicaoMotivo)) return false;

        const motivosValidos = json.DistribuicaoMotivo.every(m =>
            typeof m.motivo === 'string' &&
            (typeof m.porcentagem === 'number' || !isNaN(Number(m.porcentagem)))
        );

        if (!motivosValidos) return false;

        const opcoesRecomendadas = [
            "Encaminhar para orientação pedagógica",
            "Monitoramento padrão",
            "Contato imediato com responsável",
        ];

        if (!opcoesRecomendadas.includes(json.Recomendacao)) return false;

        return true;

    } catch (err) {
        console.error("Erro ao validar JSON:", err);
        return false;
    }
}
