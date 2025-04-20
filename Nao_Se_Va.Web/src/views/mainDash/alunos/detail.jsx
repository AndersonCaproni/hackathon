import { Box, Grid, Tooltip, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useInfos } from "../../../hooks/InfosProvider";
import { useEffect, useState } from "react";
import Grafico from "../../../components/Grafico";

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
        KeyboardArrowDown,
        KeyboardArrowUp,
        Collapse,
        setAlunos
    } = useInfos();
    const [aluno, setAluno] = useState([]);
    const [resposta, setResposta] = useState({});
    const [dataGrafico, setDataGrafico] = useState([]);

    useEffect(() => {
        const alunoSelecionado = alunos.find((aluno) => aluno.id === Number(info?.id));
        setAluno(alunoSelecionado);
        carregarDados(alunoSelecionado);
    }, []);

    const carregarDados = async (alunoSelecionado) => {
        setLoadingOpen(true);

        try {
            var response;
            if (!alunoSelecionado?.estatistica) {
                response = await LlamaChat(alunoSelecionado);
                setAlunos((alunos) =>
                    alunos.map((aluno) =>
                        aluno.id === alunoSelecionado.id
                            ? { ...aluno, estatistica: response }
                            : aluno
                    )
                );
            }
            else{
                response = alunoSelecionado.estatistica;
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
        } finally {
            setLoadingOpen(false);
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
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Nome:
                        </Typography>

                        <Tooltip title={aluno?.nome}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.nome}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            E-mail:
                        </Typography>

                        <Tooltip title={aluno?.email}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.email}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Telefone:
                        </Typography>

                        <Tooltip title={aluno?.telefone}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.telefone}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Matrícula:
                        </Typography>

                        <Tooltip title={aluno?.matricula}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.matricula}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Período:
                        </Typography>

                        <Tooltip title={aluno?.periodo}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.periodo}º Período
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        borderTop: "solid 1px rgb(211, 211, 211)",
                        width: '100%',
                        paddingLeft: 4,
                        paddingTop: 2,
                        paddingBottom: 2,
                        display: "flex",
                        justifyContent: 'left',
                        alignItems: "baseline",
                        textAlign: 'center',
                        flexDirection: "row",
                        gap: 2
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Último Acesso:
                        </Typography>

                        <Tooltip title={aluno?.ultimoAcesso}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '80%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'default'
                                }}
                            >
                                {aluno?.ultimoAcesso}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Collapse sx={{ width: '100%' }} in={demaisInformacoes}>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Disciplinas Reprovadas:
                            </Typography>

                            <Tooltip title={aluno?.cargaHorariaCumprida}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.cargaHorariaCumprida} horas
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Carga Horária Total:
                            </Typography>

                            <Tooltip title={aluno?.cargaHorariaTotal}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.cargaHorariaTotal} horas
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Responsável Financeiro:
                            </Typography>

                            <Tooltip title={aluno?.responsavelFinanceiro}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.responsavelFinanceiro}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Disciplinas Reprovadas:
                            </Typography>

                            <Tooltip title={aluno?.disciplinasReprovadas}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.disciplinasReprovadas}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Média Geral:
                            </Typography>

                            <Tooltip title={aluno?.mediaGeral}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.mediaGeral} pontos
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Situação:
                            </Typography>

                            <Tooltip title={aluno?.situacao}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.situacao}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Bolsista:
                            </Typography>

                            <Tooltip title={aluno?.bolsista === true ? 'Sim' : 'Não'}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.bolsista === true ? 'Sim' : 'Não'}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Última Disciplina Acessado:
                            </Typography>

                            <Tooltip title={aluno?.ultimaDisciplinaAcessada}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '60%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.ultimaDisciplinaAcessada}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            gap: 2
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                Horas Complementares:
                            </Typography>

                            <Tooltip title={aluno?.horasComplementaresAcumuladas}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: '80%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: 'default'
                                    }}
                                >
                                    {aluno?.horasComplementaresAcumuladas} horas
                                </Typography>
                            </Tooltip>
                        </Box>
                    </Collapse>
                    <Box
                        onClick={() => setDemaisInformacoes(!demaisInformacoes)}
                        sx={{
                            borderTop: "solid 1px rgb(211, 211, 211)",
                            width: '100%',
                            height: '66px',
                            paddingLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: 'left',
                            alignItems: "baseline",
                            textAlign: 'center',
                            flexDirection: "row",
                            backgroundColor: '#257ae9',
                            cursor: 'pointer',
                            gap: 2,
                        }}>
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#ffffff', width: '100%', height: '100%' }}>
                            {demaisInformacoes ?
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    Minimizar informações
                                    <KeyboardArrowUp sx={{ fontSize: 32, fontFamily: 'PoppinsSemiBold' }} />
                                </Box> :
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    Expandir informações
                                    <KeyboardArrowDown sx={{ fontSize: 32, fontFamily: 'PoppinsSemiBold' }} />
                                </Box>
                            }
                        </Typography>
                    </Box>
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
                    backgroundColor: 'rgb(240, 242, 245)'
                }}>
                    <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                        Estátiscas do Aluno
                    </Typography>
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
                </Box>
            </Box>
        </div>
    )
}