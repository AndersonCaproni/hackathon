import { DataGrid } from '@mui/x-data-grid';
import { useInfos } from '../../../hooks/InfosProvider';
import { Box, Button, FormControlLabel, IconButton, Menu, MenuItem, Popover, TextField, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IconFilter, IconMessageChatbotFilled } from '@tabler/icons-react';
import { useState } from 'react';

export const ListAlunos = () => {
    const { openSide, navigate, alunos, LinearProgress , hanbleOpenBot} = useInfos();
    const [anchorEl, setAnchorEl] = useState(null);
    const [filtroNome, setFiltroNome] = useState('');
    const [apenasAtivos, setApenasAtivos] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const aplicarFiltro = () => {
        handleClose();
    };

    const style = {
        backgroundColor: "#ffffff",
        borderRadius: '30px',
        color: "#333",
        fontFamily: 'Poppins',
        p: 2,

        fontSize: 14,
        // Bordas
        border: 'none',
        boxShadow: "0px 0px 10px rgba(37, 122, 233, 0.2)",

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
            fontSize: '1.1rem',
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
            field: 'user_id',
            headerName: 'ID do Aluno',
            flex: 4,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Nome',
            flex: 4,
            editable: true,
        },
        {
            field: 'user_lastaccess',
            headerName: 'Último Acesso',
            flex: 4,
            editable: true,
        },
        {
            field: 'evasao',
            headerName: 'Probabilidade de Evasão',
            flex: 4,
            renderCell: (params) => {
                const value = params.row?.estatistica?.PossibilidadeDeEvasao;

                let percentual;

                if (!value) {

                    const valueDate = params.row?.user_lastaccess;

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
                    <IconButton sx={{ color: '#257ae9' }} onClick={() => { handleDetail(params.row?.user_id) }}>
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
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', pr: 3, flexDirection: 'column', gap: 3, mt: 3 }}>
            <Box
                sx={{
                    width: '77vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Box
                    sx={{
                        width: '90%'
                    }}
                >
                    
                </Box>
                <Box
                    sx={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 2
                    }}
                >
                    <div style={{ position: 'relative', display: 'inline-block' }}>

                        <IconButton
                            onClick={handleClick}
                            sx={{
                                backgroundColor: '#ffffff',
                                color: '#257ae9',
                                width: '3.5rem',
                                height: '3.5rem',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 20,
                                boxShadow: 2,
                            }}
                        >
                            <IconFilter size={30} />
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    zIndex: 5,
                                    overflow: 'visible',
                                    borderRadius: 2,
                                    p: 3
                                },
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                }}
                            >
                                <TextField
                                    fullWidth
                                    label="ID"
                                    variant="outlined"
                                    margin="dense"
                                    InputProps={{
                                        sx: {
                                            borderRadius: '999px',
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    variant="outlined"
                                    margin="dense"
                                    InputProps={{
                                        sx: {
                                            borderRadius: '999px',
                                        },
                                    }}
                                />
                                <Button variant="contained" fullWidth onClick={aplicarFiltro}>
                                    Aplicar Filtro
                                </Button>
                            </div>
                        </Popover>
                    </div>
                    <IconButton
                    onClick={hanbleOpenBot}
                        sx={{
                            backgroundColor: '#ffffff',
                            color: '#257ae9',
                            width: '3.5rem',
                            height: '3.5rem'
                        }}
                    >
                        <IconMessageChatbotFilled size={40} />
                    </IconButton>
                </Box>
            </Box>
            <div style={{ height: 820, width: "77vw" }}>
                <DataGrid
                    sx={style}
                    rows={alunos}
                    columns={columns}
                    localeText={localeText}
                    getRowId={(row) => row.user_id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[20, 25, 30]}
                    disableRowSelectionOnClick
                />
            </div>
        </Box>
    );
}
