import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useInfos } from "../../../hooks/InfosProvider";
import { useEffect, useState } from "react";
import Grafico from "../../../components/Grafico";
import Efeito from "../../../components/Efeito";
import toast from "react-hot-toast";
import { ChatMensagem } from "../../../services/ia";
import { obterAluno } from "../../../services/unifenas";

export const DetalheAluno = () => {
    const info = useParams();
    const [loadingOpen, setLoadingOpen] = useState(false);
    const {
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
    const [aluno, setAluno] = useState([]);
    const [resposta, setResposta] = useState({});
    const [dataGrafico, setDataGrafico] = useState([]);
    const [logs, setLogs] = useState([])

    useEffect(() => {
        const id = info?.id;
        console.log(info)
        console.log(id)
        const obter = async () => {
            const log = await obterAluno(id);
            console.log(log)
            const alunoSelecionado = alunos?.find((aluno) => aluno?.user_id === id);
            console.log(alunoSelecionado)
            setAluno(alunoSelecionado);
            carregarDados(alunoSelecionado,log);
        }
        obter();
    }, []);

    const carregarDados = async (alunoSelecionado,log) => {
        setLoadingOpen(true);

        try {
            var response;
            if (!alunoSelecionado?.estatistica) {
                response = await LlamaChat(log);
                setAlunos((alunos) =>
                    alunos.map((aluno) =>
                        aluno?.user_id === alunoSelecionado?.user_id
                            ? { ...aluno, estatistica: response }
                            : aluno
                    )
                );
            }
            else {
                response = alunoSelecionado.estatistica;
            }
            console.log(response)
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

            const alunoChat = listaMensagem?.find(item => item?.user_id === aluno?.user_id)?.mensagens || [];


            const novaLista = [...alunoChat, novaPergunta];

            setListaMensagem((mensagemAtual) => {
                const existeChat = mensagemAtual.find(item => item?.user_id === aluno?.user_id);

                if (existeChat) {
                    return mensagemAtual.map(item =>
                        item?.user_id === aluno?.user_id
                            ? { ...item, mensagens: [...item.mensagens, novaPergunta] }
                            : item
                    );
                } else {
                    return [
                        ...mensagemAtual,
                        {
                            id: aluno?.user_id,
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
                    item?.user_id === aluno?.user_id ?
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
            setChatSelecionado(aluno?.user_id)
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
            alignItems: "top",
            display: "flex",
            justifyContent: "center",
            gap: '4rem',
            paddingBottom: '4rem',
            paddingTop: '4rem'
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
                height: "auto",
                border: "solid 1px rgb(211, 211, 211)",
                borderRadius: "10px",
                alignSelf: "flex-start",
                overflow: "hidden",
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgb(240, 242, 245)'
                }}>
                    <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                        Informações do Aluno
                    </Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>

                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
                minHeight: '500px',
                height: loadingOpen ? "500px" : "auto",
                border: "solid 1px rgb(211, 211, 211)",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                alignSelf: "flex-start",
            }}>
                <Loading
                    style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgb(255, 255, 255)",
                        zIndex: 9999,
                    }}
                    loading={loadingOpen}
                />
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgb(240, 242, 245)',
                    position: 'relative'
                }}>
                    <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                        Estátiscas do Aluno
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            top: '50%',
                            right: '20px',
                            transform: 'TranslateY(-50%)'
                        }}
                    >
                        <IconButton
                            sx={{
                                color: '#257ae9'
                            }}
                            onClick={async () => {
                                setAlunos((alunos) =>
                                    alunos.map((item) =>
                                        item?.user_id === aluno?.user_id ?
                                            { ...item, estatistica: null } :
                                            item)
                                );

                                await carregarDados(aluno)
                            }}
                        >
                            <Sync
                                sx={{
                                    fontSize: 30,
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingTop: 5,
                        paddingBottom: 5,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "center",
                        textAlign: 'center',
                        flexDirection: "column",
                        gap: 4
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Porcentagem de chance de Evasão:
                        </Typography>

                        <Box sx={{ width: '80%', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={Number(resposta.PossibilidadeDeEvasao)}
                                    sx={{
                                        height: 30,
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
                            <Box sx={{ minWidth: 40 }}>
                                <Typography variant="body1" fontWeight="bold" color={resposta.PossibilidadeDeEvasao >= 70
                                    ? '#f44336'
                                    : resposta.PossibilidadeDeEvasao >= 40
                                        ? '#fbc02d'
                                        : '#4caf50'}>
                                    {`${resposta.PossibilidadeDeEvasao}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingTop: 5,
                        paddingBottom: 5,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "center",
                        textAlign: 'center',
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Principais motivos para a possível evasão:
                        </Typography>

                        <Grafico dataGrafico={dataGrafico} />
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingTop: 5,
                        paddingBottom: 5,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "center",
                        textAlign: 'center',
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Contextualização da possibilidade:
                        </Typography>

                        <Tooltip title={resposta?.MotivoPrincipal}>
                            <Typography
                                variant="h7"
                                sx={{
                                    maxWidth: '80%',
                                    cursor: 'default',
                                    textAlign: 'left',
                                    width: '80%',
                                }}
                            >
                                {resposta?.MotivoPrincipal}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingTop: 5,
                        paddingBottom: 5,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "center",
                        textAlign: 'center',
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Recomendação:
                        </Typography>

                        <Tooltip title={resposta?.Recomendacao}>
                            <Typography
                                variant="h7"
                                sx={{
                                    maxWidth: '80%',
                                    width: '80%',
                                    cursor: 'default',
                                    textAlign: 'left',
                                }}
                            >
                                {resposta?.Recomendacao}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box
                        onClick={() => { Mensagem() }}
                        sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            height: 'auto',
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: "center",
                            textAlign: 'center',
                            flexDirection: "row",
                            backgroundColor: '#257ae9',
                            cursor: 'pointer',
                            gap: 2,
                            position: 'relative'
                        }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#ffffff', width: '100%', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                                <AutoAwesome sx={{ fontSize: 32, fontFamily: 'PoppinsSemiBold' }} />
                                Ficou com alguma dúvida?
                                <br />
                                Consulte nossa IA por aqui!

                            </Box>
                        </Typography>
                        <Efeito />
                    </Box>
                </Box>
            </Box>
        </div >
    )
}