import { Box, Button, Typography, Chip, LinearProgress, TextField } from "@mui/material";
import { IconAdjustmentsX, IconBookFilled, IconCalendar, IconCalendarCode, IconCalendarMinus, IconCalendarPlus, IconCalendarWeek, IconChartBarPopular, IconClock2, IconEye, IconFileExport, IconLogout2, IconPercentage10, IconSchool, IconSchoolOff, IconTrendingUp2 } from "@tabler/icons-react";
import { useInfos } from "../../../hooks/InfosProvider";
import TabelaModal from "../../../components/Tabela";
import { useEffect, useState } from "react";
import { number } from "prop-types";
import * as XLSX from 'xlsx';
import { IconChevronRight } from '@tabler/icons-react';
import toast from "react-hot-toast";
import TabelaModalDisciplina from "../../../components/Tabela/tabelaDisciplina";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

const Relatorios = () => {
    const { alunos, coordenador, disciplinas, setDisciplinas, formatarData } = useInfos();
    const [abrirTabela, setAbrirTabela] = useState(false)
    const [abrirTabelaDisciplina, setAbrirTabelaDisciplina] = useState(false)
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [data, setData] = useState(null)
    const [dataAnterior, setDataAnterior] = useState(null)
    const [dataPosterior, setDataPosterior] = useState(null)
    const [dataInicio, setDataInicio] = useState(null)
    const [dataFim, setDataFim] = useState(null)

    function calcularDesvioPadrao(arrayDeNumeros) {
        if (!arrayDeNumeros || arrayDeNumeros.length < 2) {
            return 0;
        }

        const n = arrayDeNumeros.length;
        const media = arrayDeNumeros.reduce((a, b) => a + b) / n;

        const variancia = arrayDeNumeros
            .map(x => Math.pow(x - media, 2))
            .reduce((a, b) => a + b) / n;

        return Math.sqrt(variancia);
    }

    function exportar10AlunosComMaiorRiscoDeEvasao() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

        const top10Alunos = alunosComRisco.slice(0, 10);

        const dadosParaExportar = top10Alunos.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'E-mail': aluno.email,
            'Matrícula': aluno.matricula,
            'Média Geral': aluno.media,
            'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
            'Total de Acessos': aluno.totalAcessos,
            'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 },
            { wch: 35 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos em Risco');

        XLSX.writeFile(workbook, 'Relatorio_Alunos_em_Risco.xlsx');
    }

    function obter10AlunosComMaiorRiscoDeEvasao() {
        const hoje = new Date();
        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });
        alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);
        const top10Alunos = alunosComRisco.slice(0, 10);
        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Risco de Evasão',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'success';
                    let label = `${percentage}% - Baixo`;

                    if (riskValue >= 0.70) {
                        chipColor = 'error';
                        label = `${percentage}% - Alto`;
                    } else if (riskValue >= 0.4) {
                        chipColor = 'warning';
                        label = `${percentage}% - Médio`;
                    }
                    return <Chip label={label} color={chipColor} size="small" />;
                }
            }
        ]);
        setRows(top10Alunos.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function obter10MelhoresAlunos() {
        const hoje = new Date();
        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => a.indiceDeRisco - b.indiceDeRisco);

        const top10MelhoresAlunos = alunosComRisco.slice(0, 10);

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Índice de Desempenho',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;

                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'error';
                    let label = `${percentage}% - Regular`;

                    if (riskValue < 0.25) {
                        chipColor = 'success';
                        label = `${percentage}% - Excelente`;
                    } else if (riskValue < 0.6) {
                        chipColor = 'info';
                        label = `${percentage}% - Bom`;
                    }
                    return <Chip label={label} color={chipColor} size="small" variant="outlined" />;
                }
            }
        ]);
        setRows(top10MelhoresAlunos.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function exportar10MelhoresAlunos() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 30);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => a.indiceDeRisco - b.indiceDeRisco);

        const top10MelhoresAlunos = alunosComRisco.slice(0, 10);

        const dadosParaExportar = top10MelhoresAlunos.map(aluno => {
            const pontuacaoDesempenho = 100 - (aluno.indiceDeRisco * 100);
            return {
                'Nome do Aluno': aluno.nome,
                'E-mail': aluno.email,
                'Matrícula': aluno.matricula,
                'Média Geral': aluno.media,
                'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
                'Total de Acessos': aluno.totalAcessos,
                'Pontuação de Desempenho (0-100)': pontuacaoDesempenho.toFixed(0)
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 }, { wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 30 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Melhores Alunos');
        XLSX.writeFile(workbook, 'Relatorio_Melhores_Alunos.xlsx');
    }

    function obterAlunosInconsistentes() {
        // 1. Mapeia cada aluno para um novo objeto que inclui o desvio padrão
        const alunosComDesvio = alunos.map(aluno => {
            const notas = aluno.disciplinas.map(d => d.pontosAtuais);
            const desvioPadrao = calcularDesvioPadrao(notas);
            return {
                ...aluno,
                desvioPadrao: parseFloat(desvioPadrao.toFixed(2)) // Adiciona o novo campo
            };
        });

        // 2. Ordena os alunos pelo desvio padrão em ordem DECRESCENTE
        alunosComDesvio.sort((a, b) => b.desvioPadrao - a.desvioPadrao);

        // 3. Pega os 10 mais inconsistentes
        const top10Inconsistentes = alunosComDesvio.slice(0, 10);

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'media', headerName: 'Média Geral', flex: 1 },
            {
                field: 'desvioPadrao',
                headerName: 'Inconsistência (Desvio Padrão)',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="N/A" size="small" />;

                    const desvio = params.value;
                    let chipColor = 'success';
                    let label = `Baixa (${desvio.toFixed(1)})`;

                    if (desvio > 25) {
                        chipColor = 'error';
                        label = `Muito Alta (${desvio.toFixed(1)})`;
                    } else if (desvio > 15) {
                        chipColor = 'warning';
                        label = `Alta (${desvio.toFixed(1)})`;
                    } else if (desvio > 5) {
                        chipColor = 'info';
                        label = `Moderada (${desvio.toFixed(1)})`;
                    }

                    return <Chip label={label} color={chipColor} size="small" variant="outlined" />;
                }
            },
            {
                field: 'disciplinas',
                headerName: 'Notas',
                flex: 2,
                // Mostra as notas para dar contexto rápido
                renderCell: (params) => params.value.map(d => d.pontosAtuais).join(' | ')
            }
        ]);

        setRows(top10Inconsistentes.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function exportarAlunosInconsistentes() {
        // 1. Calcula o desvio padrão para cada aluno
        const alunosComDesvio = alunos.map(aluno => {
            const notas = aluno.disciplinas.map(d => d.pontosAtuais);
            const desvioPadrao = calcularDesvioPadrao(notas);
            return {
                ...aluno,
                desvioPadrao: parseFloat(desvioPadrao.toFixed(2))
            };
        });

        // 2. Ordena pelo maior desvio padrão
        alunosComDesvio.sort((a, b) => b.desvioPadrao - a.desvioPadrao);

        // 3. Pega os 10 mais
        const top10Inconsistentes = alunosComDesvio.slice(0, 10);

        // 4. Prepara os dados para o arquivo Excel
        const dadosParaExportar = top10Inconsistentes.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'Média Geral': aluno.media.toFixed(1),
            'Desvio Padrão das Notas': aluno.desvioPadrao,
            'Notas Detalhadas': aluno.disciplinas.map(d => d.pontosAtuais).join(', '),
            'E-mail': aluno.email,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        // Ajusta a largura das colunas
        const colunasLargura = [
            { wch: 30 }, { wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 35 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos Inconsistentes');
        XLSX.writeFile(workbook, 'Relatorio_Alunos_Inconsistentes.xlsx');
    }

    function obterDesempenhoPorDisciplina() {
        const relatorioDisciplinas = disciplinas.map(disciplina => {
            if (!disciplina.alunos || disciplina.alunos.length === 0) {
                return {
                    id: disciplina.idDisciplina,
                    nome: disciplina.nome,
                    mediaDaTurma: 0,
                    numeroDeAlunos: 0
                };
            }

            // CORREÇÃO: Usar aluno.nota em vez de aluno.pontosNestaDisciplina
            const somaDasNotas = disciplina.alunos.reduce((acc, aluno) => acc + aluno.nota, 0);
            const media = somaDasNotas / disciplina.alunos.length;

            return {
                idDisciplina: disciplina.idDisciplina,
                nome: disciplina.nome,
                mediaDaTurma: parseFloat(media.toFixed(2)),
                numeroDeAlunos: disciplina.alunos.length
            };
        });

        relatorioDisciplinas.sort((a, b) => a.mediaDaTurma - b.mediaDaTurma);

        setColumns([
            { field: 'nome', headerName: 'Disciplina', flex: 2 },
            {
                field: 'mediaDaTurma',
                headerName: 'Média da Turma',
                flex: 2,
                renderCell: (params) => {
                    const media = params.value;
                    let progressColor = 'success';
                    if (media < 5) progressColor = 'error';
                    else if (media < 7) progressColor = 'warning';

                    return (
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Box sx={{ width: '70%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={media * 10} color={progressColor} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${media.toFixed(1)}`}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            { field: 'numeroDeAlunos', headerName: 'Nº de Alunos', flex: 1 },
        ]);

        setRows(relatorioDisciplinas);
        setAbrirTabelaDisciplina(true);
    }

    function exportarDesempenhoPorDisciplina() {
        const relatorioDisciplinas = disciplinas.map(disciplina => {
            if (!disciplina.alunos || disciplina.alunos.length === 0) {
                return { nome: disciplina.nome, mediaDaTurma: 0, numeroDeAlunos: 0 };
            }

            // CORREÇÃO: Usar aluno.nota em vez de aluno.pontosNestaDisciplina
            const somaDasNotas = disciplina.alunos.reduce((acc, aluno) => acc + aluno.nota, 0);
            const media = somaDasNotas / disciplina.alunos.length;

            return {
                'Nome da Disciplina': disciplina.nome,
                'Média da Turma': parseFloat(media.toFixed(2)),
                'Alunos Inscritos': disciplina.alunos.length
            };
        });

        relatorioDisciplinas.sort((a, b) => a['Média da Turma'] - b['Média da Turma']);

        const worksheet = XLSX.utils.json_to_sheet(relatorioDisciplinas);
        const workbook = XLSX.utils.book_new();

        worksheet['!cols'] = [{ wch: 40 }, { wch: 20 }, { wch: 20 }];

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Desempenho por Disciplina');
        XLSX.writeFile(workbook, 'Relatorio_Desempenho_Disciplinas.xlsx');
    }

    function exportarPorData() {
        if (data === null || !data) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(data).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso === dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });

            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            const dadosParaExportar = alunosComRisco.map(aluno => ({
                'Nome do Aluno': aluno.nome,
                'E-mail': aluno.email,
                'Matrícula': aluno.matricula,
                'Média Geral': aluno.media,
                'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
                'Total de Acessos': aluno.totalAcessos,
                'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
            }));

            const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

            const colunasLargura = [
                { wch: 30 },
                { wch: 35 },
                { wch: 15 },
                { wch: 15 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 }
            ];
            worksheet['!cols'] = colunasLargura;

            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos');

            XLSX.writeFile(workbook, 'Relatorio_Alunos_por_Data.xlsx');
        }
    }

    function obterPorData() {
        if (data === null || !data) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(data).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso === dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });
            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            setColumns([
                { field: 'nome', headerName: 'Nome', flex: 2 },
                { field: 'email', headerName: 'E-mail', flex: 3 },
                { field: 'matricula', headerName: 'Matrícula', flex: 2 },
                { field: 'media', headerName: 'Média Geral', flex: 1.5 },
                { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
                {
                    field: 'indiceDeRisco',
                    headerName: 'Risco de Evasão',
                    flex: 1.5,
                    renderCell: (params) => {
                        if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                        const riskValue = params.value;
                        const percentage = (riskValue * 100).toFixed(0);
                        let chipColor = 'success';
                        let label = `${percentage}% - Baixo`;

                        if (riskValue >= 0.70) {
                            chipColor = 'error';
                            label = `${percentage}% - Alto`;
                        } else if (riskValue >= 0.4) {
                            chipColor = 'warning';
                            label = `${percentage}% - Médio`;
                        }
                        return <Chip label={label} color={chipColor} size="small" />;
                    }
                }
            ]);
            setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
            setAbrirTabela(true);
        }
    }

    function exportarPorDataAnterior() {
        if (dataAnterior === null || !dataAnterior) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(dataAnterior).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso < dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });

            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            const dadosParaExportar = alunosComRisco.map(aluno => ({
                'Nome do Aluno': aluno.nome,
                'E-mail': aluno.email,
                'Matrícula': aluno.matricula,
                'Média Geral': aluno.media,
                'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
                'Total de Acessos': aluno.totalAcessos,
                'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
            }));

            const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

            const colunasLargura = [
                { wch: 30 },
                { wch: 35 },
                { wch: 15 },
                { wch: 15 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 }
            ];
            worksheet['!cols'] = colunasLargura;

            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos');

            XLSX.writeFile(workbook, 'Relatorio_Alunos_por_Data_Anterior.xlsx');
        }
    }

    function obterPorDataAnterior() {
        if (dataAnterior === null || !dataAnterior) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(dataAnterior).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso < dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });
            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            setColumns([
                { field: 'nome', headerName: 'Nome', flex: 2 },
                { field: 'email', headerName: 'E-mail', flex: 3 },
                { field: 'matricula', headerName: 'Matrícula', flex: 2 },
                { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
                { field: 'media', headerName: 'Média Geral', flex: 1.5 },
                {
                    field: 'indiceDeRisco',
                    headerName: 'Risco de Evasão',
                    flex: 1.5,
                    renderCell: (params) => {
                        if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                        const riskValue = params.value;
                        const percentage = (riskValue * 100).toFixed(0);
                        let chipColor = 'success';
                        let label = `${percentage}% - Baixo`;

                        if (riskValue >= 0.70) {
                            chipColor = 'error';
                            label = `${percentage}% - Alto`;
                        } else if (riskValue >= 0.4) {
                            chipColor = 'warning';
                            label = `${percentage}% - Médio`;
                        }
                        return <Chip label={label} color={chipColor} size="small" />;
                    }
                }
            ]);
            setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
            setAbrirTabela(true);
        }
    }

    function exportarPorDataPosterior() {
        if (dataPosterior === null || !dataPosterior) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(dataPosterior).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso > dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });

            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            const dadosParaExportar = alunosComRisco.map(aluno => ({
                'Nome do Aluno': aluno.nome,
                'E-mail': aluno.email,
                'Matrícula': aluno.matricula,
                'Média Geral': aluno.media,
                'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
                'Total de Acessos': aluno.totalAcessos,
                'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
            }));

            const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

            const colunasLargura = [
                { wch: 30 },
                { wch: 35 },
                { wch: 15 },
                { wch: 15 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 }
            ];
            worksheet['!cols'] = colunasLargura;

            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos');

            XLSX.writeFile(workbook, 'Relatorio_Alunos_por_Data_Posterior.xlsx');
        }
    }

    function obterPorDataPosterior() {
        if (dataPosterior === null || !dataPosterior) {
            toast.error("Selecione uma data para visualizar a consulta")
        }
        else {
            const dataSelecionada = dayjs(dataPosterior).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return dataUltimoAcesso > dataSelecionada;
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });
            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            setColumns([
                { field: 'nome', headerName: 'Nome', flex: 2 },
                { field: 'email', headerName: 'E-mail', flex: 3 },
                { field: 'matricula', headerName: 'Matrícula', flex: 2 },
                { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
                { field: 'media', headerName: 'Média Geral', flex: 1.5 },
                {
                    field: 'indiceDeRisco',
                    headerName: 'Risco de Evasão',
                    flex: 1.5,
                    renderCell: (params) => {
                        if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                        const riskValue = params.value;
                        const percentage = (riskValue * 100).toFixed(0);
                        let chipColor = 'success';
                        let label = `${percentage}% - Baixo`;

                        if (riskValue >= 0.70) {
                            chipColor = 'error';
                            label = `${percentage}% - Alto`;
                        } else if (riskValue >= 0.4) {
                            chipColor = 'warning';
                            label = `${percentage}% - Médio`;
                        }
                        return <Chip label={label} color={chipColor} size="small" />;
                    }
                }
            ]);
            setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
            setAbrirTabela(true);
        }
    }

    function exportarPorIntervalo() {
        if (dataInicio === null || !dataInicio) {
            toast.error("Selecione uma data Inicial para visualizar a consulta")
        }
        else if (dataFim === null || !dataFim) {
            toast.error("Selecione uma data Final para visualizar a consulta")
        }
        else {
            const dataInicialSelecionada = dayjs(dataInicio).format('YYYY-MM-DD');
            const dataFinalSelecionada = dayjs(dataFim).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return (dataUltimoAcesso >= dataInicialSelecionada && dataUltimoAcesso <= dataFinalSelecionada);
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });

            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

            const dadosParaExportar = alunosComRisco.map(aluno => ({
                'Nome do Aluno': aluno.nome,
                'E-mail': aluno.email,
                'Matrícula': aluno.matricula,
                'Média Geral': aluno.media,
                'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
                'Total de Acessos': aluno.totalAcessos,
                'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
            }));

            const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

            const colunasLargura = [
                { wch: 30 },
                { wch: 35 },
                { wch: 15 },
                { wch: 15 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 }
            ];
            worksheet['!cols'] = colunasLargura;

            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos');

            XLSX.writeFile(workbook, 'Relatorio_Alunos_por_Data_Intervalo.xlsx');
        }
    }

    function obterPorIntervalo() {
        if (dataInicio === null || !dataInicio) {
            toast.error("Selecione uma data Inicial para visualizar a consulta")
        }
        else if (dataFim === null || !dataFim) {
            toast.error("Selecione uma data Final para visualizar a consulta")
        }
        else if (dayjs(dataInicio).format('YYYY-MM-DD') >= dayjs(dataFim).format('YYYY-MM-DD')) {
            toast.error("Selecione uma data Inicial maior do que a data Final")
        }
        else {
            const dataInicialSelecionada = dayjs(dataInicio).format('YYYY-MM-DD');
            const dataFinalSelecionada = dayjs(dataFim).format('YYYY-MM-DD');
            const hoje = new Date();
            const alunoHoje = alunos.filter(x => {
                const dataUltimoAcesso = dayjs(x.ultimoAcesso).format('YYYY-MM-DD');
                return (dataUltimoAcesso >= dataInicialSelecionada && dataUltimoAcesso <= dataFinalSelecionada);
            });
            const alunosComRisco = alunoHoje.map(aluno => {
                const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
                const ultimoAcesso = new Date(aluno.ultimoAcesso);
                const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
                const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
                const pesoMedia = 0.2;
                const pesoAcesso = 0.7;
                const pesoEngajamento = 0.1;
                const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
                return {
                    ...aluno,
                    indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
                };
            });
            alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);
            setColumns([
                { field: 'nome', headerName: 'Nome', flex: 2 },
                { field: 'email', headerName: 'E-mail', flex: 3 },
                { field: 'matricula', headerName: 'Matrícula', flex: 2 },
                { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
                { field: 'media', headerName: 'Média Geral', flex: 1.5 },
                {
                    field: 'indiceDeRisco',
                    headerName: 'Risco de Evasão',
                    flex: 1.5,
                    renderCell: (params) => {
                        if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                        const riskValue = params.value;
                        const percentage = (riskValue * 100).toFixed(0);
                        let chipColor = 'success';
                        let label = `${percentage}% - Baixo`;

                        if (riskValue >= 0.70) {
                            chipColor = 'error';
                            label = `${percentage}% - Alto`;
                        } else if (riskValue >= 0.4) {
                            chipColor = 'warning';
                            label = `${percentage}% - Médio`;
                        }
                        return <Chip label={label} color={chipColor} size="small" />;
                    }
                }
            ]);
            setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
            setAbrirTabela(true);
        }
    }

    function exportarRankingPorRisco() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

        const dadosParaExportar = alunosComRisco.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'E-mail': aluno.email,
            'Matrícula': aluno.matricula,
            'Média Geral': aluno.media,
            'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
            'Total de Acessos': aluno.totalAcessos,
            'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 },
            { wch: 35 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos em Risco');

        XLSX.writeFile(workbook, 'Relatorio_Alunos_em_Risco.xlsx');
    }

    function obterRankingPorRisco() {
        const hoje = new Date();
        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });
        alunosComRisco.sort((a, b) => b.indiceDeRisco - a.indiceDeRisco);

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Risco de Evasão',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'success';
                    let label = `${percentage}% - Baixo`;

                    if (riskValue >= 0.70) {
                        chipColor = 'error';
                        label = `${percentage}% - Alto`;
                    } else if (riskValue >= 0.4) {
                        chipColor = 'warning';
                        label = `${percentage}% - Médio`;
                    }
                    return <Chip label={label} color={chipColor} size="small" />;
                }
            }
        ]);
        setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function exportarRankingPorMedia() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });
        alunosComRisco.sort((a, b) => a.media - b.media);

        const dadosParaExportar = alunosComRisco.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'E-mail': aluno.email,
            'Matrícula': aluno.matricula,
            'Média Geral': aluno.media,
            'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
            'Total de Acessos': aluno.totalAcessos,
            'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 },
            { wch: 35 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos em Risco');

        XLSX.writeFile(workbook, 'Relatorio_Alunos_Por_Media.xlsx');
    }

    function obterRankingPorMedia() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => a.media - b.media);

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Risco de Evasão',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'success';
                    let label = `${percentage}% - Baixo`;

                    if (riskValue >= 0.70) {
                        chipColor = 'error';
                        label = `${percentage}% - Alto`;
                    } else if (riskValue >= 0.4) {
                        chipColor = 'warning';
                        label = `${percentage}% - Médio`;
                    }
                    return <Chip label={label} color={chipColor} size="small" />;
                }
            }
        ]);
        setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function exportarRankingPorAcesso() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => new Date(b.ultimoAcesso) - new Date(a.ultimoAcesso));

        const dadosParaExportar = alunosComRisco.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'E-mail': aluno.email,
            'Matrícula': aluno.matricula,
            'Média Geral': aluno.media,
            'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
            'Total de Acessos': aluno.totalAcessos,
            'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 },
            { wch: 35 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos em Risco');

        XLSX.writeFile(workbook, 'Relatorio_Alunos_Por_Acesso.xlsx');
    }

    function obterRankingPorAcesso() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => new Date(b.ultimoAcesso) - new Date(a.ultimoAcesso));

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Risco de Evasão',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'success';
                    let label = `${percentage}% - Baixo`;

                    if (riskValue >= 0.70) {
                        chipColor = 'error';
                        label = `${percentage}% - Alto`;
                    } else if (riskValue >= 0.4) {
                        chipColor = 'warning';
                        label = `${percentage}% - Médio`;
                    }
                    return <Chip label={label} color={chipColor} size="small" />;
                }
            }
        ]);
        setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    function exportarRankingPorTotalAcesso() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => a.totalAcessos - b.totalAcessos);

        const dadosParaExportar = alunosComRisco.map(aluno => ({
            'Nome do Aluno': aluno.nome,
            'E-mail': aluno.email,
            'Matrícula': aluno.matricula,
            'Média Geral': aluno.media,
            'Último Acesso': new Date(aluno.ultimoAcesso).toLocaleDateString('pt-BR'),
            'Total de Acessos': aluno.totalAcessos,
            'Índice de Risco (%)': (aluno.indiceDeRisco * 100).toFixed(0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);

        const colunasLargura = [
            { wch: 30 },
            { wch: 35 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 }
        ];
        worksheet['!cols'] = colunasLargura;

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos em Risco');

        XLSX.writeFile(workbook, 'Relatorio_Alunos_Por_Total_de_Acessos.xlsx');
    }

    function obterRankingPorTotalAcesso() {
        const hoje = new Date();

        const alunosComRisco = alunos.map(aluno => {
            const riscoMedia = Math.max(0, 1 - (aluno.media / 100));
            const ultimoAcesso = new Date(aluno.ultimoAcesso);
            const diasDesdeUltimoAcesso = Math.floor((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
            const riscoAcesso = Math.min(1, diasDesdeUltimoAcesso / 90);
            const riscoEngajamento = Math.max(0, 1 - (aluno.totalAcessos / 200));
            const pesoMedia = 0.2;
            const pesoAcesso = 0.7;
            const pesoEngajamento = 0.1;
            const indiceDeRisco = (riscoMedia * pesoMedia) + ((riscoAcesso * 2) * pesoAcesso) + (riscoEngajamento * pesoEngajamento);
            return {
                ...aluno,
                indiceDeRisco: parseFloat(indiceDeRisco.toFixed(2))
            };
        });

        alunosComRisco.sort((a, b) => a.totalAcessos - b.totalAcessos);

        setColumns([
            { field: 'nome', headerName: 'Nome', flex: 2 },
            { field: 'email', headerName: 'E-mail', flex: 3 },
            { field: 'matricula', headerName: 'Matrícula', flex: 2 },
            { field: 'totalAcessos', headerName: 'Total de Acessos', flex: 2 },
            { field: 'ultimoAcesso', headerName: 'Último Acesso', flex: 2, renderCell: (params) => formatarData(params.row.ultimoAcesso) },
            { field: 'media', headerName: 'Média Geral', flex: 1.5 },
            {
                field: 'indiceDeRisco',
                headerName: 'Risco de Evasão',
                flex: 1.5,
                renderCell: (params) => {
                    if (typeof params.value !== 'number') return <Chip label="Indefinido" size="small" />;
                    const riskValue = params.value;
                    const percentage = (riskValue * 100).toFixed(0);
                    let chipColor = 'success';
                    let label = `${percentage}% - Baixo`;

                    if (riskValue >= 0.70) {
                        chipColor = 'error';
                        label = `${percentage}% - Alto`;
                    } else if (riskValue >= 0.4) {
                        chipColor = 'warning';
                        label = `${percentage}% - Médio`;
                    }
                    return <Chip label={label} color={chipColor} size="small" />;
                }
            }
        ]);
        setRows(alunosComRisco.map(aluno => ({ ...aluno, id: aluno.idAluno })));
        setAbrirTabela(true);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: 'auto',
                flexDirection: 'column',
                mt: 3,
                mr: 3,
                mb: 3,
                gap: 5,
                pt: 4,
            }}>
            <TabelaModal open={abrirTabela} close={() => setAbrirTabela(false)} columns={columns} rows={rows} />
            <TabelaModalDisciplina open={abrirTabelaDisciplina} close={() => setAbrirTabelaDisciplina(false)} columns={columns} rows={rows} />
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    gap: 1,
                }}
            >
                <IconChevronRight color={'#2196f3'} size={40} />
                <Typography
                    sx={{
                        color: "#257ae9",
                        fontSize: '2.5rem',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        lineHeight: 1,
                    }}
                >
                    Desempenho Acadêmico
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconSchoolOff size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}> Top 10 alunos mais Prováveis de Evadir</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obter10AlunosComMaiorRiscoDeEvasao}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportar10AlunosComMaiorRiscoDeEvasao}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconSchool size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Top 10 alunos que mais se Destacaram</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obter10MelhoresAlunos}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportar10MelhoresAlunos}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconAdjustmentsX size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Alunos Inconsistentes</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterAlunosInconsistentes}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarAlunosInconsistentes}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconBookFilled size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Desempenho por Disciplina</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterDesempenhoPorDisciplina}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarDesempenhoPorDisciplina}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    gap: 1,
                    mt: 5
                }}
            >
                <IconChevronRight color={'#2196f3'} size={40} />
                <Typography
                    sx={{
                        color: "#257ae9",
                        fontSize: '2.5rem',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        lineHeight: 1,
                    }}
                >
                    Engajamento e Participação
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconCalendar size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}> Acessos por Data</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Selecione uma data"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            value={data}
                            onChange={(novaData) => setData(novaData)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#257ae9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiSvgIcon-root': {
                                                color: '#257ae9',
                                            },
                                            '& fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterPorData}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarPorData}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconCalendarWeek size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}> Acessos por Intervalo de Data</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Selecione a data inicial"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            value={dataInicio}
                            onChange={(novaData) => setDataInicio(novaData)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#257ae9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiSvgIcon-root': {
                                                color: '#257ae9',
                                            },
                                            '& fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Selecione a data final"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            value={dataFim}
                            onChange={(novaData) => setDataFim(novaData)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#257ae9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiSvgIcon-root': {
                                                color: '#257ae9',
                                            },
                                            '& fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterPorIntervalo}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarPorIntervalo}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconCalendarMinus size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Alunos com Acesso Anterior à Data Selecionada</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Selecione uma data"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            value={dataAnterior}
                            onChange={(novaData) => setDataAnterior(novaData)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#257ae9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiSvgIcon-root': {
                                                color: '#257ae9',
                                            },
                                            '& fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterPorDataAnterior}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarPorDataAnterior}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconCalendarPlus size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Alunos com Acesso Posterior à Data Selecionada</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Selecione uma data"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            value={dataPosterior}
                            onChange={(novaData) => setDataPosterior(novaData)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#257ae9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiSvgIcon-root': {
                                                color: '#257ae9',
                                            },
                                            '& fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#257ae9',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterPorDataPosterior}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarPorDataPosterior}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    gap: 1,
                    mt: 5
                }}
            >
                <IconChevronRight color={'#2196f3'} size={40} />
                <Typography
                    sx={{
                        color: "#257ae9",
                        fontSize: '2.5rem',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        lineHeight: 1,
                    }}
                >
                    Comprometimento com o Curso
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconLogout2 size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Ranking de Alunos por Risco de Evasão</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterRankingPorRisco}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarRankingPorRisco}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconChartBarPopular size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Ranking de Alunos por Média</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterRankingPorMedia}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarRankingPorMedia}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconClock2 size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Ranking de Alunos por Último Acesso</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterRankingPorAcesso}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarRankingPorAcesso}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 3,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '30px',
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                    gap: 3
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <IconTrendingUp2 size={40} style={{ color: "#257ae9" }} />
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '1.5rem' }}>Ranking de Alunos por Total de Acesso</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderRadius: '30px',
                        gap: 3
                    }}>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1 }} onClick={obterRankingPorTotalAcesso}>
                        <IconEye size={20} style={{ color: "#257ae9" }} />
                        Ver prévia
                    </Button>
                    <Button variant='outlined' sx={{ display: 'flex', gap: 1, backgroundColor: "#257ae9", color: '#fff' }} onClick={exportarRankingPorTotalAcesso}>
                        <IconFileExport size={20} style={{ color: "#fff" }} />
                        Exportar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Relatorios;