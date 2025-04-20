import { Box } from "@mui/material";
import { useInfos } from "../../../hooks/InfosProvider";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const Perfil = () => {
    const {
        coordenador,
        setCoordenador,
        Box,
        Typography,
        Tooltip
    } = useInfos()

    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
            padding: 3,
        }}>
            <Box sx={{
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

                <Tooltip title={coordenador?.nome}>
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
                        {coordenador?.nome}
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

                <Tooltip title={coordenador?.email}>
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
                        {coordenador?.email}
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

                <Tooltip title={coordenador?.telefone}>
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
                        {coordenador?.telefone}
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
                    Titulação:
                </Typography>

                <Tooltip title={coordenador?.titulacao}>
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
                        {coordenador?.titulacao}
                    </Typography>
                </Tooltip>
            </Box>
            <div>
                <Accordion
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                        borderTop: "solid 1px rgb(211, 211, 211)",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#257ae9' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            padding: 0,
                            paddingRight: 5,
                            margin: 0,
                            border: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        <Typography variant="h5" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9', marginLeft: 4 }}>
                            Cursos Coordenados:
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            border: 'none',
                            boxShadow: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 4
                        }}
                    >
                        {
                            coordenador?.cursosCoordenados?.map((item, index) =>
                                <Box
                                    key={index}
                                    sx={{
                                        border: "solid 1px rgb(211, 211, 211)",
                                        width: '90%',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItens: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        padding: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: 'auto',
                                            width: '50%',
                                            display: 'flex',
                                            alignItens: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box sx={{
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
                                            <Typography variant="h6" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                                Curso:
                                            </Typography>

                                            <Tooltip title={item?.nome}>
                                                <Typography
                                                    variant="h7"
                                                    sx={{
                                                        maxWidth: '80%',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        cursor: 'default'
                                                    }}
                                                >
                                                    {item?.nome}
                                                </Typography>
                                            </Tooltip>
                                        </Box>
                                        <Box sx={{
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
                                            <Typography variant="h6" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                                Carga Horária:
                                            </Typography>

                                            <Tooltip title={item?.cargaHoraria}>
                                                <Typography
                                                    variant="h7"
                                                    sx={{
                                                        maxWidth: '80%',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        cursor: 'default'
                                                    }}
                                                >
                                                    {item?.cargaHoraria} horas
                                                </Typography>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: 'auto',
                                            width: '50%',
                                            display: 'flex',
                                            alignItens: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Box sx={{
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
                                            <Typography variant="h6" sx={{ fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                                                Modalidade:
                                            </Typography>

                                            <Tooltip title={item?.modalidade}>
                                                <Typography
                                                    variant="h7"
                                                    sx={{
                                                        maxWidth: '80%',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        cursor: 'default'
                                                    }}
                                                >
                                                    {item?.modalidade}
                                                </Typography>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    )
}

export default Perfil;