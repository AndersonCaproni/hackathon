import { DataGrid } from '@mui/x-data-grid';
import { useInfos } from '../../../hooks/InfosProvider';
import { Box, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


export const ListAlunos = () => {
    const { openSide, navigate, alunos, LinearProgress } = useInfos();

    const style = {
        backgroundColor: "#f4f6f8",
        color: "#333",
        fontFamily: 'Poppins',

        fontSize: 14,
        // Bordas
        border: 'none',
        boxShadow: "0px 0px 10px 0px rgba(37, 122, 233, 0.4)",

        // Células
        "& .MuiDataGrid-cell": {
            color: "#333",
            fontWeight: 500,
            borderBottom: "1px solid #ddd",
            backgroundColor: "#ffffff"
        },

        // Cabeçalho
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: '#000',
            fontSize: '1rem',
        },


        // Hover nas linhas
        "& .MuiDataGrid-row:hover": {
            backgroundColor: "#cfe3fc"
        },

        // Seleção de linhas
        "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#90caf9 !important",
        },

        // Paginação
        "& .MuiTablePagination-root": {
            color: "#333",
        },

        // Barra de rolagem
        "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "8px",
            },
        },

        // Centralizar conteúdo das células
        "& .MuiDataGrid-cellContent": {
            justifyContent: "center",
        },
    }

    const localeText = {
        noRowsLabel: 'Nenhum registro encontrado',
        noResultsOverlayLabel: 'Nenhum resultado encontrado',
        errorOverlayDefaultLabel: 'Ocorreu um erro.',

        toolbarDensity: 'Densidade',
        toolbarDensityLabel: 'Densidade',
        toolbarDensityCompact: 'Compacto',
        toolbarDensityStandard: 'Padrão',
        toolbarDensityComfortable: 'Confortável',

        toolbarColumns: 'Colunas',
        toolbarColumnsLabel: 'Selecionar colunas',

        toolbarFilters: 'Filtros',
        toolbarFiltersLabel: 'Mostrar filtros',
        toolbarFiltersTooltipHide: 'Esconder filtros',
        toolbarFiltersTooltipShow: 'Mostrar filtros',

        toolbarExport: 'Exportar',
        toolbarExportLabel: 'Exportar',
        toolbarExportCSV: 'Baixar como CSV',

        columnsPanelTextFieldLabel: 'Encontrar coluna',
        columnsPanelTextFieldPlaceholder: 'Título da coluna',
        columnsPanelDragIconLabel: 'Reordenar coluna',
        columnsPanelShowAllButton: 'Mostrar todas',
        columnsPanelHideAllButton: 'Ocultar todas',

        footerRowSelected: (count) =>
            count !== 1
                ? `${count.toLocaleString()} linhas selecionadas`
                : `${count.toLocaleString()} linha selecionada`,
        footerTotalRows: 'Total de linhas:',

        columnMenuSortAsc: 'Ordenar crescente',
        columnMenuSortDesc: 'Ordenar decrescente',
        columnMenuFilter: 'Filtrar',
        columnMenuHideColumn: 'Esconder coluna',
        columnMenuShowColumns: 'Mostrar colunas',
    };

    const columns = [
        {
            field: 'nome',
            headerName: 'Nome',
            flex: 4,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 4,
            editable: true,
        },
        {
            field: 'curso',
            headerName: 'Curso',
            flex: 3,
            editable: true,
        },
        {
            field: 'periodo',
            headerName: 'Periodo',
            flex: 2,
            editable: true,
            renderCell: (params) => `${params.row.periodo}º`
        },
        {
            field: 'ultimoAcessoOuPorcentagem',
            headerName: 'Probabilidade de Evasão',
            flex: 4,
            renderCell: (params) => {
                const value = params.row?.estatistica?.PossibilidadeDeEvasao;

                let percentual;

                if (!value) {

                    const valueDate = params.row?.ultimoAcesso;

                    if (!valueDate) return null;

                    const ultimoAcesso = new Date(valueDate);
                    const hoje = new Date();

                    hoje.setHours(0, 0, 0, 0);
                    ultimoAcesso.setHours(0, 0, 0, 0);

                    const totalDiasReferencia = 30;

                    const diffDias = Math.ceil(
                        (hoje.getTime() - ultimoAcesso.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    const diasSemAcesso = Math.max(0, Math.min(diffDias, totalDiasReferencia));

                    percentual = (diasSemAcesso / totalDiasReferencia) * 100;
                }
                else {
                    percentual = value;
                }

                let cor;
                if (percentual >= 70) cor = '#f44336';
                else if (percentual >= 40) cor = '#fbc02d';
                else cor = '#4caf50';

                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            px: 1,
                        }}
                    >
                        <Box sx={{ width: '80%' }}>
                            <Tooltip title={"Estes dados podem não estar atualizados, consulte na informação do aluno"}>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentual}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: cor,
                                        },
                                    }}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip title={"Informação do Aluno"}>
                <IconButton sx={{ color: '#257ae9' }} onClick={() => { handleDetail(params.row?.id) }}>
                    <InfoIcon />
                </IconButton>
                </Tooltip>
            ),
        },
    ];

    const handleDetail = async (id) => {
        navigate(`alunos/${id}/detalhe`);
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ height: 580, width: openSide ? "calc(93vw - 240px)" : "93vw" }}>
                <DataGrid
                    sx={style}
                    rows={alunos}
                    columns={columns}
                    localeText={localeText}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    disableRowSelectionOnClick
                />
            </div>
        </Box>
    );
}
