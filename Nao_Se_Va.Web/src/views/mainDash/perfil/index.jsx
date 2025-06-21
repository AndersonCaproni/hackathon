import { Box } from "@mui/material";
import { useInfos } from "../../../hooks/InfosProvider";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
//import { obterAluno } from "../../../services/unifenas";
import { obterAluno } from "../../../services/back";
import { IconChevronRight } from "@tabler/icons-react";

const Perfil = () => {
    const {
        coordenador,
        setCoordenador,
        Box,
        Loading,
        Typography,
        Tooltip,
        alunos
    } = useInfos()

    const [resumoCursos, setResumoCursos] = useState([]);


    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
            padding: 3,
        }}>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    pl: 5,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    gap: 4,
                }}
            >
                {
                    !coordenador || coordenador === typeof (undefined) ?
                        <Loading loading={!coordenador} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Informações do coordenador</Typography>
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
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{coordenador?.idProfessor}</Typography>
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
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{coordenador?.nome}</Typography>
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
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>E-mail:</Typography>
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{coordenador?.email}</Typography>
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
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Curso:</Typography>
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{coordenador?.cursoResponsavel}</Typography>
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
                                    <Typography variant='h4' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>{coordenador?.matricula}</Typography>
                                </Box>
                            </Box>
                        </>
                }
            </Box>
            <Box
                sx={{
                    mt: 3,
                    backgroundColor: '#fff',
                    width: '100%',
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
                        maxHeight: "500px",
                        p: 4,
                        pl: 5,
                        overflowY: 'auto',
                        overflowX: 'hidden',
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
                        !coordenador || coordenador === typeof (undefined) ?
                            <Loading loading={!coordenador} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                        mb: 4
                                    }}
                                >
                                    <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                    <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Disciplinas Ministradas</Typography>
                                </Box>
                                {
                                    coordenador?.disciplinas?.map((item, index) => {
                                        return (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'left',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div style={{ margin: 0, width: "100%", height: '1px', backgroundColor: "#2196f3"}}/>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'left',
                                                        flexDirection: 'row',
                                                        gap: 2,
                                                        mt: 3,
                                                        mb: 3
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '60%',
                                                            height: 'auto',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'left',
                                                            flexDirection: 'row',
                                                            gap: 2,
                                                            m: 0
                                                        }}
                                                    >
                                                        <IconChevronRight color={'#2196f3'} size={30} />
                                                        <Typography variant='h4' sx={{ m: 0,fontSize: '1.4rem', fontFamily: 'Poppins' }}>{item?.nome}</Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '40%',
                                                            height: 'auto',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'left',
                                                            flexDirection: 'row',
                                                            gap: 2,
                                                            m: 0
                                                        }}
                                                    >
                                                        <Typography variant='h4' sx={{ m: 0,fontWeight: "bold", fontSize: '1.4rem', fontFamily: 'Poppins' }}>Duração:</Typography>
                                                        <Typography variant='h4' sx={{ m: 0,fontSize: '1.4rem', fontFamily: 'Poppins' }}>{item?.duracao} h</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                            </>
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default Perfil;