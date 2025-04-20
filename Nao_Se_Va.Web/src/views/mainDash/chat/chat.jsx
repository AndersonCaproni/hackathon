import { useEffect, useRef } from "react";
import { useInfos } from "../../../hooks/InfosProvider";
import style from './_chat.module.css'
import { CircularProgress, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { ArrowUpward, ContentCopy } from "@mui/icons-material";
import { ChatMensagem } from '../../../services/ia';

export default function Chat() {
    const {
        Box,
        pergunta,
        setPergunta,
        loadingResposta,
        setLoadingResposta,
        listaMensagem,
        setListaMensagem,
    } = useInfos();
    const corpoRef = useRef(null);

    const scrollToBottom = () => {
        if (corpoRef.current) {
            corpoRef.current.scrollTop = corpoRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [listaMensagem]);

    const lista = [
        { mensagem: "Oi, você pode me ajudar com JavaScript?", tipo: "pergunta" },
        { mensagem: "Claro! O que exatamente você precisa saber?", tipo: "resposta" },

        { mensagem: "Como faço para converter uma string em número?", tipo: "pergunta" },
        { mensagem: "Você pode usar `parseInt()` ou `Number()`. Por exemplo: `Number('123')` retorna 123.", tipo: "resposta" },

        { mensagem: "E como verifico se uma variável é `null` ou `undefined`?", tipo: "pergunta" },
        { mensagem: "Você pode usar: `if (variavel == null)`, isso cobre ambos os casos.", tipo: "resposta" },

        { mensagem: "Estou tentando usar React, como crio um componente?", tipo: "pergunta" },
        { mensagem: "Um componente básico seria assim:\n\n```jsx\nfunction MeuComponente() {\n  return <div>Olá!</div>;\n}\n```", tipo: "resposta" },

        { mensagem: "Legal! E como passo props para esse componente?", tipo: "pergunta" },
        { mensagem: "Você pode fazer assim:\n\n```jsx\nfunction MeuComponente({ nome }) {\n  return <div>Olá, {nome}!</div>;\n}\n```", tipo: "resposta" },

        { mensagem: "Tem como estilizar com styled-components?", tipo: "pergunta" },
        { mensagem: "Sim! Exemplo:\n\n```jsx\nconst Botao = styled.button`\n  background-color: blue;\n  color: white;\n`;\n```", tipo: "resposta" },

        { mensagem: "Você conhece alguma API de IA que eu posso usar?", tipo: "pergunta" },
        { mensagem: "Sim! Você pode usar a OpenAI API (ChatGPT), HuggingFace, ou a API do LLaMA da Meta.", tipo: "resposta" },

        { mensagem: "Como faço uma chamada para API usando Axios?", tipo: "pergunta" },
        { mensagem: "Exemplo com Axios:\n\n```js\naxios.get('/api/dados').then(res => console.log(res.data));\n```", tipo: "resposta" },
    ];

    const Mensagem = async () => {
        if (pergunta !== '') {
            const novaPergunta = {
                mensagem: pergunta,
                tipo: 'pergunta',
            };

            const novaLista = [...listaMensagem, novaPergunta];

            setListaMensagem(novaLista);
            setPergunta('');
            setLoadingResposta(true);

            const response = await ChatMensagem(novaLista);

            setListaMensagem((item) => [
                ...item,
                {
                    mensagem: response,
                    tipo: 'resposta',
                },
            ]);
            setLoadingResposta(false);
        }
    };

    return (
        <form
            className={style.pagina}
            onSubmit={(e) => {
                e.preventDefault();
                Mensagem();
            }}
        >
            <div className={style.corpo} ref={corpoRef}>
                {listaMensagem.map((item, index) =>
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: item?.tipo === 'pergunta' ? 'right' : 'left',
                            position: 'relative'

                        }}>
                        <Box
                            sx={{
                                textAlign: 'left',
                                maxWidth: '70%',
                                border: item?.tipo === 'pergunta' ? '2px solid #257ae9' : '2px solid rgb(105, 133, 170)',
                                borderRadius: '20px',
                                padding: '20px',
                                backgroundColor: item?.tipo === 'resposta' && 'rgb(241, 243, 245)'
                            }}>
                            <Typography

                                variant="h7"
                            >
                                {item.mensagem}
                            </Typography>
                            <Tooltip title="Copiar">
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        border: '1px solid #999999',
                                        color: '#257ae9',
                                        backgroundColor: "#ffffff",
                                        zIndex: 10,
                                        bottom: -10,
                                        right: item?.tipo === 'pergunta' && -10,
                                        left: item?.tipo === 'resposta' && -10,
                                        '&:hover': {
                                            backgroundColor: 'rgb(230, 234, 241)',
                                        }
                                    }}
                                    onClick={() => navigator.clipboard.writeText(item.mensagem)}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Box>
                )}
            </div>
            <div className={style.input}>
                <div className={style.text}>
                    <TextField
                        label="Me pergunte alguma coisa"
                        variant="outlined"
                        size="small"
                        value={pergunta}
                        onChange={(e) => { setPergunta(e.target.value) }}
                        sx={{
                            width: '80%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '100px',
                                paddingRight: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: '10px 20px',
                            },
                        }}
                    />
                    <IconButton
                        sx={{
                            color: '#ffffff',
                            backgroundColor: '#257ae9',
                            '&:hover': {
                                backgroundColor: '#1e63c5', // uma cor um pouco mais escura
                            },
                        }}
                        type="submit"
                    >
                        {
                            loadingResposta ?
                                <CircularProgress size="20px" sx={{ color: '#ffffff', }}/> :
                                <ArrowUpward />
                        }

                    </IconButton>
                </div>
                <Typography variant="caption">A IA pode cometer erros. Considere verificar informações importantes.</Typography>
            </div>
        </form >
    )
}