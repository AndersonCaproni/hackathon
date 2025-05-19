import { useEffect, useRef, useState } from "react";
import { useInfos } from "../../../hooks/InfosProvider";
import style from './_chat.module.css'
import { CircularProgress, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { ArrowUpward, ContentCopy, Height } from "@mui/icons-material";
import { ChatMensagem } from '../../../services/ia';
import toast from "react-hot-toast";
import { within } from "@testing-library/dom";

export default function Chat() {
    const {
        Box,
        pergunta,
        setPergunta,
        loadingResposta,
        setLoadingResposta,
        listaMensagem,
        setListaMensagem,
        chatSelecionado,
        setChatSelecionado,
        AutoAwesome
    } = useInfos();
    const corpoRef = useRef(null);
    const [mensagemDoChat, setMensagemDoChat] = useState([])

    const scrollToBottom = () => {
        if (corpoRef.current) {
            corpoRef.current.scrollTop = corpoRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [listaMensagem, pergunta, mensagemDoChat, chatSelecionado]);


    useEffect(() => {
        setMensagemDoChat(listaMensagem?.find(item => item.user_id === chatSelecionado)?.mensagens || [])
    }, [chatSelecionado]);

    const Mensagem = async () => {
        try {
            if (pergunta !== '') {
                const novaPergunta = {
                    mensagem: pergunta,
                    tipo: 'pergunta',
                };

                const novaLista = [...mensagemDoChat, novaPergunta];

                setMensagemDoChat(novaLista);
                setPergunta('');
                setLoadingResposta(true);

                const response = await ChatMensagem(novaLista);

                const novaListaResposta = [...novaLista, {
                    mensagem: response,
                    tipo: 'resposta',
                }]

                setMensagemDoChat(novaListaResposta);


                setListaMensagem((mensagem) =>
                    mensagem.map((item) =>
                        item.user_id === chatSelecionado ?
                            { ...item, mensagens: novaListaResposta } :
                            item
                    ))
            }
        }
        catch (ex) {
            toast.error("Sua IA expirou, consulte seu suporte!")
        }
        finally {
            setLoadingResposta(false);
        }

    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'relative',
                overflow: 'hidden',
                height: '100vh',
                pt: 3,
                pr: 3,
                pb: 3,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    height: '100%',
                    borderRadius: '30px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '300px',
                        height: '100%',
                        display: 'flex',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgb(247, 247, 247)',
                        borderRight: 'solid 1px rgb(211, 211, 211)',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        overflowY: 'scroll',
                    }}

                    className={style.side}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            paddingLeft: '1rem',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'rgb(231, 231, 231)'
                            },
                            gap: '0.5rem'
                        }}
                        onClick={() => { setChatSelecionado('IAPADRAOCHATUNICOESTE') }}
                    >
                        <AutoAwesome sx={{ fontSize: '1rem' }} />
                        <Typography
                            sx={{
                                fontFamily: 'Poppins !important'
                            }}
                        >
                            Chat IA
                        </Typography>
                    </Box>
                    <div style={{ backgroundColor: 'rgb(211, 211, 211)', width: '84%', height: '1px' }}></div>
                    {
                        listaMensagem?.slice(1)?.map((item, index) =>
                            <Box
                                key={index}
                                sx={{
                                    width: '100%',
                                    height: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'left',
                                    paddingLeft: '1rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgb(231, 231, 231)'
                                    },
                                    gap: '0.5rem'
                                }}
                                onClick={() => { setChatSelecionado(item?.user_id) }}
                            >
                                <Tooltip title={item?.nome}>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            fontFamily: 'Poppins !important',
                                            maxWidth: '90%',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: 'rgb(96, 96, 97)'
                                        }}
                                    >
                                        {item?.nome}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        )
                    }
                </Box>
                <form
                    className={style.pagina}
                    onSubmit={(e) => {
                        e.preventDefault();
                        Mensagem();
                    }}
                >
                    <div className={style.corpo} ref={corpoRef}>
                        {
                            mensagemDoChat?.length === 0 ?
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            color: ' rgb(235, 235, 235)',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Inicie sua conversa
                                    </Typography>
                                </Box> :

                                mensagemDoChat?.map((item, index) =>
                                    item?.tipo !== 'perguntaAluno' &&
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
                                )
                        }
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
                                        backgroundColor: '#1e63c5',
                                    },
                                }}
                                type="submit"
                            >
                                {
                                    loadingResposta ?
                                        <CircularProgress size="20px" sx={{ color: '#ffffff', }} /> :
                                        <ArrowUpward />
                                }

                            </IconButton>
                        </div>
                        <Typography variant="caption">A IA pode cometer erros. Considere verificar informações importantes.</Typography>
                    </div>
                </form >
            </Box>
        </Box>
    )
}