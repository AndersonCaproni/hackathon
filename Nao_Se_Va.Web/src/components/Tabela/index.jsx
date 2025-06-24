import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TabelaModal = ({ open, close, columns, rows }) => {
    return (

        <Modal
            open={open}
            onClose={close}
            sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center'
            }}
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(221, 221, 221, 0.4)'
                }
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '30px',
                    p: 3,
                    boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)"
                }}
            >
                <DataGrid
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: '0',
                        color: "#333",
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        border: 'none',
                        boxShadow: "none",

                        "& .MuiDataGrid-cell": {
                            color: "#333",
                            fontWeight: 500,
                            borderBottom: "1px solid #ddd",
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                            color: '#000',
                            fontSize: '1.1rem',
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#cfe3fc"
                        },
                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: "#90caf9 !important",
                        },
                        "& .MuiTablePagination-root": {
                            color: "#333",
                        },
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
                        "& .MuiDataGrid-cellContent": {
                            justifyContent: "center",
                        },
                    }}
                    rows={rows || []}
                    columns={columns || []}
                    getRowId={(row) => row.idAluno}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 30]}
                />
            </Box>
        </Modal>
    )
}

export default TabelaModal;