import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useInfos } from "../../../hooks/InfosProvider";
import { useEffect, useState } from "react";
import Grafico from "../../../components/Grafico";
import Efeito from "../../../components/Efeito";
import toast from "react-hot-toast";
import { ChatMensagem } from "../../../services/ia";
import { obterAluno } from "../../../services/back";
import { IconChevronRight } from '@tabler/icons-react';
import GridViewIcon from '@mui/icons-material/GridView';

export const DetalheAluno = () => {
    const info = useParams();
    const [loadingOpen, setLoadingOpen] = useState(false);
    const {
        formatarData,
        alunos,
        Loading,
        LlamaChat,
        LinearProgress,
        demaisInformacoes,
        setDemaisInformacoes,
        setLoadingSupremo,
        setChatSelecionado,
        KeyboardArrowDown,
        KeyboardArrowUp,
        Collapse,
        setAlunos,
        Sync,
        AutoAwesome,
        listaMensagem,
        navigate,
        setListaMensagem
    } = useInfos();
    const [aluno, setAluno] = useState(null);
    const [resposta, setResposta] = useState({});
    const [dataGrafico, setDataGrafico] = useState(null);

    useEffect(() => {
        const id = info?.id;
        console.log(id)
        const obter = async () => {
            const aluno = await obterAluno(id);
            console.log(aluno)
            setAluno(aluno);
            if (aluno) {
                carregarDados(aluno);
            }
        }
        obter();
    }, []);

    const carregarDados = async (alunoSelecionado) => {
        setLoadingOpen(true);

        try {
            var response;
            console.log(alunoSelecionado)
            const alunoComEstatistica = alunos?.find(aluno => aluno.idAluno === alunoSelecionado.idAluno);
            console.log(alunoComEstatistica)
            if (!alunoComEstatistica?.estatistica) {
                response = await LlamaChat(alunoSelecionado);
                console.log(response)
                setAlunos((alunos) =>
                    alunos.map((aluno) =>
                        aluno?.idAluno === alunoSelecionado?.idAluno
                            ? { ...aluno, estatistica: response }
                            : aluno
                    )
                );
            }
            else {
                response = alunoComEstatistica.estatistica;
            }

            setResposta(response);

            if (Array.isArray(response?.DistribuicaoMotivo)) {
                const dadosGrafico = response.DistribuicaoMotivo.map((item, index) => ({
                    id: index,
                    value: Number(item.porcentagem),
                    label: item.motivo,
                }));
                setDataGrafico(dadosGrafico);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            toast.error("Erro ao carregar os dados! Recarregue a página e se o erro persistir, consulte seu suporte")
        } finally {
            setLoadingOpen(false);
        }
    };

    const Mensagem = async () => {
        try {
            const novaPergunta = {
                mensagem: `Você é uma inteligência artificial especializada em análise de evasão escolar. A seguir, forneço os dados de um aluno:
            
                ${JSON.stringify(aluno)}
            
                Com base nesses dados, você me retornou a seguinte análise:
            
                ${JSON.stringify(resposta)}
            
                Desejo continuar esta conversa, pois tenho algumas dúvidas específicas sobre este aluno.
            
                Sua tarefa, neste momento, é apenas me informar que está pronto para continuar me auxiliando.
            
                O formato da sua resposta deve ser o seguinte:
                "Olá, estou pronto para te ajudar com o aluno (nome do aluno). Qual a sua dúvida?"

                Este formato de resposta á apenas para esta pergunta, você deve desconsiderar o formato acima nas demais perguntas que eu for fazer.
            
                Se eu escolher mudar de assunto você não deve aceitar, deve falar apenas do aluno mencionado, o ajudando sobre questões academicas, didaticas, ensino, etc, coisas de professor

                Analise novamente os dados que forneci, pois farei perguntas a partir deles nas próximas interações.

                Considere que a data atual é ${new Date().toLocaleDateString('pt-BR')} e leve isso em conta nas suas análises e cálculos.
                `,
                tipo: 'perguntaAluno',
            };

            const alunoChat = listaMensagem?.find(item => item?.idAluno === aluno?.idAluno)?.mensagens || [];


            const novaLista = [...alunoChat, novaPergunta];

            setListaMensagem((mensagemAtual) => {
                const existeChat = mensagemAtual.find(item => item?.idAluno === aluno?.idAluno);

                if (existeChat) {
                    return mensagemAtual.map(item =>
                        item?.idAluno === aluno?.idAluno
                            ? { ...item, mensagens: [...item.mensagens, novaPergunta] }
                            : item
                    );
                } else {
                    return [
                        ...mensagemAtual,
                        {
                            idAluno: aluno?.idAluno,
                            nome: aluno?.nome,
                            mensagens: [novaPergunta]
                        }
                    ];
                }
            });

            setLoadingSupremo(true);

            const response = await ChatMensagem(novaLista);

            setListaMensagem((mensagem) =>
                mensagem.map((item) =>
                    item?.idAluno === aluno?.idAluno ?
                        {
                            ...item,
                            mensagens: [
                                ...item.mensagens,
                                {
                                    mensagem: `Olá, eu tenho algumas dúvidas sobre o aluno ${aluno?.nome}. Você consegue me ajudar?`,
                                    tipo: 'pergunta',
                                },
                                {
                                    mensagem: response,
                                    tipo: 'resposta',
                                }
                            ],
                        }
                        : item
                ))
            setChatSelecionado(aluno?.idAluno)
            setLoadingSupremo(false);
            navigate('./ia')

        }
        catch (ex) {
            setLoadingOpen(false);
            toast.error("Sua IA expirou, consulte seu suporte!")
        }
    };

    return (
        <div style={{
            width: "100%",
            height: 'auto',
            display: "flex",
        }}>

            <Box
                sx={{
                    width: '100%',
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            width: '60%',
                            height: 'auto',
                            borderRadius: '30px',
                            marginBottom: 3,
                            marginRight: 3,
                            display: 'flex',
                            overflowX: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                width: '100%',
                                height: '100%',
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: "338px",
                                p: 4,
                                pl: 5,
                                overflowY: 'auto',
                                overflowX: 'auto',
                                gap: 4,
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                    backgroundColor: 'transparent'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: '#2196f3'
                                }
                            }}
                        >
                            {
                                !aluno || aluno === typeof (undefined) ?
                                    <Loading loading={!aluno} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                    :
                                    <>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >
                                            <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                            <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Informações do Aluno</Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>ID:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{aluno?.idAluno}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Nome:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{aluno?.nome}</Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '50%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                                                    E-mail:
                                                </Typography>
                                                <Tooltip title={aluno?.email || ''} arrow>
                                                    <Typography
                                                        variant='h4'
                                                        noWrap
                                                        sx={{
                                                            fontSize: '1.4rem',
                                                            fontFamily: 'Poppins',
                                                            maxWidth: '300px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            cursor: 'default',
                                                        }}
                                                    >
                                                        {aluno?.email}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: '50%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                                                    Média Geral:
                                                </Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>
                                                    {aluno?.media} pontos
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Telefone:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{aluno?.telefone}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Período:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{aluno?.periodo}°</Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Matrícula:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{aluno?.matricula}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Último acesso:</Typography>
                                                <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{formatarData(aluno?.ultimoAcesso)}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            width: '40%',
                            height: 'auto',
                            borderRadius: '30px',
                            marginBottom: 3,
                            display: 'flex',
                            overflowX: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                width: '100%',
                                height: '100%',
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: "338px",
                                p: 4,
                                pl: 5,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                gap: 4,
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                    backgroundColor: 'transparent'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: '#2196f3'
                                }
                            }}
                        >
                            {
                                !aluno || aluno === typeof (undefined) ?
                                    <Loading loading={!aluno} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                    :
                                    <>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                flexDirection: 'row',
                                                gap: 2,
                                            }}
                                        >
                                            <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                            <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Disciplinas Matriculadas</Typography>
                                        </Box>
                                        {
                                            aluno?.disciplinas?.map((item, index) => {
                                                return (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'left',
                                                            flexDirection: 'row',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'left',
                                                                flexDirection: 'row',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            <IconChevronRight color={'#2196f3'} size={30} />
                                                            <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{item?.nome}</Typography>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                    </>
                            }
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundColor: '',
                        width: '100%',
                        height: '30rem',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 3
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            marginRight: 1.5,
                            borderRadius: '30px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 4,
                            pl: 5,
                            overflow: 'hidden'
                        }}
                    >
                        {
                            !dataGrafico ?
                                <Loading loading={!dataGrafico} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                :
                                <>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'left',
                                            flexDirection: 'row',
                                            gap: 2,
                                        }}
                                    >
                                        <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                        <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Chance de evasão</Typography>
                                    </Box>
                                    <Grafico dataGrafico={dataGrafico} />
                                </>
                        }
                    </Box>
                    <Box
                        sx={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            marginLeft: 1.5,
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                borderRadius: '30px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    borderRadius: '30px',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    p: 4,
                                    pl: 5,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    gap: 3,
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                        backgroundColor: 'transparent'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: '#2196f3'
                                    }
                                }}
                            >
                                {
                                    !dataGrafico ?
                                        <Loading loading={!dataGrafico} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                        :
                                        <>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                                <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Motivo</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'top'
                                                }}
                                            >
                                                <IconChevronRight color={'#2196f3'} size={30} />
                                                <Typography
                                                    variant="h7"
                                                    sx={{
                                                        fontSize: '1.3rem',
                                                        cursor: 'default',
                                                        textAlign: 'left',
                                                        width: '80%',
                                                    }}
                                                >
                                                    {resposta?.MotivoPrincipal}
                                                </Typography>
                                            </Box>
                                        </>
                                }
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                borderRadius: '30px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    borderRadius: '30px',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    p: 4,
                                    pl: 5,
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    gap: 3,
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                        backgroundColor: 'transparent'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: '#2196f3'
                                    }
                                }}
                            >
                                {
                                    !dataGrafico ?
                                        <Loading loading={!dataGrafico} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                        :
                                        <>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                }}
                                            >
                                                <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                                <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Recomendação</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'top'
                                                }}
                                            >
                                                <IconChevronRight color={'#2196f3'} size={30} />
                                                <Typography
                                                    variant="h7"
                                                    sx={{
                                                        fontSize: '1.3rem',
                                                        cursor: 'default',
                                                        textAlign: 'left',
                                                        width: '80%',
                                                    }}
                                                >
                                                    {resposta?.Recomendacao}
                                                </Typography>
                                            </Box>
                                        </>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundColor: '',
                        width: '100%',
                        height: '13.1rem',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            width: '70%',
                            height: '100%',
                            display: 'flex',
                            marginRight: 1.5,
                            borderRadius: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 4,
                            pl: 5,
                            pr: 5,
                            gap: 5
                        }}
                    >
                        {
                            !dataGrafico ?
                                <Loading loading={!dataGrafico} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                :
                                <>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'left',
                                            flexDirection: 'row',
                                            gap: 2,
                                        }}
                                    >
                                        <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                        <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Probabilidade de evasão</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Number(resposta.PossibilidadeDeEvasao)}
                                                sx={{
                                                    height: 40,
                                                    borderRadius: 5,
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor:
                                                            resposta.PossibilidadeDeEvasao >= 70
                                                                ? '#f44336'
                                                                : resposta.PossibilidadeDeEvasao >= 40
                                                                    ? '#fbc02d'
                                                                    : '#4caf50',
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '1.5rem' }} color={resposta.PossibilidadeDeEvasao >= 70
                                                ? '#f44336'
                                                : resposta.PossibilidadeDeEvasao >= 40
                                                    ? '#fbc02d'
                                                    : '#4caf50'}>
                                                {`${resposta.PossibilidadeDeEvasao}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </>
                        }
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            width: '30%',
                            height: '100%',
                            marginLeft: 1.5,
                            borderRadius: '30px',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            ':hover': {
                                transform: 'scale(1.01)',
                                transition: 'transform 0.2s ease',
                            }
                        }}
                    >
                        {
                            !dataGrafico ?
                                <Loading loading={!dataGrafico} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                :
                                <>
                                    <Box
                                        onClick={() => { Mensagem() }}
                                        sx={{
                                            backgroundColor: '#2196f3',
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            borderRadius: '30px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#ffffff', width: '100%', height: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, width: '100%', height: '100%' }}>
                                                <AutoAwesome sx={{ fontSize: 32, fontFamily: 'PoppinsSemiBold' }} />
                                                Ficou com alguma dúvida?
                                                <br />
                                                Consulte nossa IA por aqui!

                                            </Box>
                                        </Typography>
                                        <Efeito />
                                    </Box>
                                </>
                        }
                    </Box>
                </Box>
            </Box >
        </div >
    )
}