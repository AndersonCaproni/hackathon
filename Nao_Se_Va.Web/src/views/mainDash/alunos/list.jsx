import { useInfos } from '../../../hooks/InfosProvider';
import {
    Box,
    IconButton,
    Tooltip,
    LinearProgress,
    Button,
    Paper,
    useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    MaterialReactTable,
    useMaterialReactTable,
    createMRTColumnHelper,
} from 'material-react-table';
import Loading from '../../../components/Loading';

const columnHelper = createMRTColumnHelper();

export function ListAlunos() {
    const { alunos, navigate, openSide } = useInfos();
    const theme = useTheme();

    const handleDetail = (id) => {
        navigate(`alunos/${id}/detalhe`);
    };

    const handleExportRows = (rows) => {
        const doc = new jsPDF();
        const tableHeaders = ['ID do Aluno', 'Nome', 'Último Acesso'];
        const tableData = rows.map((row) => [
            row.original.user_id,
            row.original.name,
            row.original.user_lastaccess,
        ]);

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save('alunos.pdf');
    };

    const columns = [
        columnHelper.accessor('user_id', {
            header: 'ID do Aluno',
            muiTableBodyCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
            muiTableHeadCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
        }),
        columnHelper.accessor('name', {
            header: 'Nome',
            muiTableBodyCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
            muiTableHeadCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
        }),
        columnHelper.accessor('user_lastaccess', {
            header: 'Último Acesso',
            muiTableBodyCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
            muiTableHeadCellProps: {
                sx: { width: '18%', flexGrow: 1 },
            },
        }),
        columnHelper.display({
            id: 'evasao',
            header: 'Probabilidade de Evasão',
            muiTableBodyCellProps: {
                sx: { width: '30%', flexGrow: 1 },
            },
            muiTableHeadCellProps: {
                sx: { width: '30%', flexGrow: 1 },
            },
            Cell: ({ row }) => {
                const value = row.original.estatistica?.PossibilidadeDeEvasao;
                const valueDate = row.original.user_lastaccess;
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);

                let percentual = 0;

                if (!value && valueDate) {
                    const ultimoAcesso = new Date(valueDate);
                    ultimoAcesso.setHours(0, 0, 0, 0);

                    const totalDiasReferencia = 30;
                    const diffDias = Math.ceil((hoje - ultimoAcesso) / (1000 * 60 * 60 * 24));
                    const diasSemAcesso = Math.max(0, Math.min(diffDias, totalDiasReferencia));
                    percentual = (diasSemAcesso / totalDiasReferencia) * 100;
                } else if (value) {
                    percentual = value;
                }

                let cor;
                if (percentual >= 70) cor = '#f44336';
                else if (percentual >= 40) cor = '#fbc02d';
                else cor = '#4caf50';

                return (
                    <Tooltip title="Estes dados podem não estar atualizados, consulte na informação do aluno">
                        <Box sx={{ width: '100%', px: 2 }}>
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
                        </Box>
                    </Tooltip>
                );
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Ações',
            muiTableBodyCellProps: {
                sx: { width: '5%', flexGrow: 1 },
            },
            muiTableHeadCellProps: {
                sx: { width: '5%', flexGrow: 1 },
            },
            Cell: ({ row }) => (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tooltip title="Informação do Aluno">
                        <IconButton
                            sx={{ color: theme.palette.primary.main }}
                            onClick={() => handleDetail(row.original.user_id)}
                        >
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        }),
    ];

    const table = useMaterialReactTable({
        columns,
        data: alunos || [],
        enableRowSelection: true,
        paginationDisplayMode: 'pages',
        enablePagination: true,
        enableColumnResizing: true,
        columnFilterDisplayMode: 'popover',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    p: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    startIcon={<FileDownloadIcon />}
                >
                    Exportar Todos
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    disabled={table.getRowModel().rows.length === 0}
                    startIcon={<FileDownloadIcon />}
                >
                    Exportar Página
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Exportar Selecionados
                </Button>
            </Box>
        ),
    });

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: openSide ? '85.5vw' : '98vw',
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                {!alunos ? (
                    <Loading
                        loading={!alunos}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                ) : (
                    <MaterialReactTable table={table} />
                )}
            </Paper>
        </Box>
    );
}
