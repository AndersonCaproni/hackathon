import { useInfos } from "../../../hooks/InfosProvider";
import Unifenas from '../../../assets/unifenas.png';
import Moodle from '../../../assets/moodle.png';
import Gmail from '../../../assets/gmail.png';
import styles from './_dash.module.css'
import { borderRadius, display, fontFamily, height, padding, textAlign, width } from "@mui/system";
import PortalProfessor from '../../../assets/portalProfessor.png'
import { ArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Dash = () => {
    const [alunoUltimoAcesso, setAlunoUltimoAcesso] = useState({})

    const {
        Box,
        Typography,
        coordenador,
        alunos,
        Tooltip,
        AutoAwesome,
        navigate
    } = useInfos()

    useEffect(() => {
        setAlunoUltimoAcesso(
            alunos?.reduce((min, aluno) => {
                return new Date(aluno.ultimoAcesso) < new Date(min.ultimoAcesso) ? aluno : min;
            }, alunos?.[0])
        )
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                padding: 6,
                display: "flex",
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    height: "auto",
                    alignSelf: "flex-start",
                    gap: 6
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "auto",
                        border: "solid 1px rgb(211, 211, 211)",
                        borderRadius: "10px",
                        alignSelf: "flex-start",
                        overflow: "hidden",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: 'center',
                            backgroundColor: 'rgb(240, 242, 245)'
                        }}>
                        <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Aluno que a mais tempo não acessa as aulas
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}>
                        {
                            alunoUltimoAcesso &&
                            <>
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

                                    <Tooltip title={alunoUltimoAcesso?.nome}>
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
                                            {alunoUltimoAcesso?.nome}
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

                                    <Tooltip title={alunoUltimoAcesso?.email}>
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
                                            {alunoUltimoAcesso?.email}
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

                                    <Tooltip title={alunoUltimoAcesso?.telefone}>
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
                                            {alunoUltimoAcesso?.telefone}
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

                                    <Tooltip title={alunoUltimoAcesso?.matricula}>
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
                                            {alunoUltimoAcesso?.matricula}
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
                                        Curso:
                                    </Typography>

                                    <Tooltip title={alunoUltimoAcesso?.curso}>
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
                                            {alunoUltimoAcesso?.curso}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                            </>
                        }
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "auto",
                        border: "solid 1px rgb(211, 211, 211)",
                        borderRadius: "10px",
                        alignSelf: "flex-start",
                        overflow: "hidden",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: 'rgb(240, 242, 245)'
                        }}>
                        <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Cursos Coordenados
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            padding: 6,
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 6
                        }}>
                        {
                            coordenador?.cursosCoordenados?.map((item, index) =>
                                <Tooltip
                                    title={
                                        <Box sx={{ padding: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                Carga Horária:
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.cargaHoraria} horas
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>
                                                Curso:
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.nome}
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>
                                                Modalidade:
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.modalidade}
                                            </Typography>
                                        </Box>
                                    }
                                    arrow
                                    placement="top"
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            cursor: 'default'
                                        }}
                                        variant='h5'
                                        key={index}>
                                        <ArrowRight /> {item.nome}
                                    </Typography>
                                </Tooltip>
                            )
                        }
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    height: "auto",
                    alignSelf: "flex-start",
                    gap: 6
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "auto",
                        border: "solid 1px rgb(211, 211, 211)",
                        borderRadius: "10px",
                        alignSelf: "flex-start",
                        overflow: "hidden",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: 'rgb(240, 242, 245)'
                        }}>
                        <Typography variant="h4" sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Links Úteis
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            paddingTop: 6,
                            paddingBottom: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 6
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexDirection: 'row',
                            }}>
                            <Box sx={{
                                width: '10rem',
                                height: '10rem',
                                border: "solid 1px rgb(211, 211, 211)",
                                overflow: 'hidden',
                                borderRadius: '10px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                                onClick={() => {
                                    window.open('https://www.unifenas.br/', '_blank');
                                }}
                            >
                                <img className={styles.foto} src={Unifenas} alt="Unifenas" />
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    backgroundColor: ' rgba(28, 80, 148, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: ' rgba(28, 80, 148,0.7)',
                                    }
                                }}>
                                    <Typography
                                        variant='h5'
                                        className="texto-hover"
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Unifenas
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '10rem',
                                height: '10rem',
                                border: "solid 1px rgb(211, 211, 211)",
                                overflow: 'hidden',
                                borderRadius: '10px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                                onClick={() => {
                                    //window.open('https://wa.me/5591999999999', '_blank');
                                    window.open('https://unifenas.lyceum.com.br/DOnline/DOnline/avisos/TDOL303D.tp', '_blank');
                                }}
                            >
                                <img className={styles.foto} src={PortalProfessor} alt="portalProfesor" />
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    backgroundColor: ' rgba(28, 80, 148, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: ' rgba(28, 80, 148,0.7)',
                                    }
                                }}>
                                    <Typography
                                        variant='h5'
                                        className="texto-hover"
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Portal
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexDirection: 'row',
                            }}>
                            <Box sx={{
                                width: '10rem',
                                height: '10rem',
                                border: "solid 1px rgb(211, 211, 211)",
                                overflow: 'hidden',
                                borderRadius: '10px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                                onClick={() => {
                                    window.open('https://moodle.unifenas.br/login/index.php', '_blank');
                                }}
                            >
                                <img className={styles.foto} src={Moodle} alt="Moodle" />
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    backgroundColor: ' rgba(28, 80, 148, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: ' rgba(28, 80, 148,0.7)',
                                    }
                                }}>
                                    <Typography
                                        variant='h5'
                                        className="texto-hover"
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Moodle
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '10rem',
                                height: '10rem',
                                border: "solid 1px rgb(211, 211, 211)",
                                overflow: 'hidden',
                                borderRadius: '10px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                                onClick={() => {
                                    //window.open('https://wa.me/5591999999999', '_blank');
                                    window.open('https://www.gmail.com', '_blank');
                                }}
                            >
                                <img className={styles.foto} src={Gmail} alt="gmail" />
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    backgroundColor: ' rgba(28, 80, 148, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: ' rgba(28, 80, 148,0.7)',
                                    }
                                }}>
                                    <Typography
                                        variant='h5'
                                        className="texto-hover"
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: 'Poppins'
                                        }}
                                    >
                                        Gmail
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "auto",
                        border: "solid 1px rgb(211, 211, 211)",
                        borderRadius: "10px",
                        alignSelf: "flex-start",
                        overflow: "hidden",
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        navigate('ia')
                    }}
                    >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: 'rgb(240, 242, 245)'
                        }}>
                        <Typography sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            <AutoAwesome sx={{ fontSize: 80 }} />
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            paddingTop: 6,
                            paddingBottom: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 6
                        }}>
                        <Typography variant='h5' sx={{ m: 4, fontFamily: 'PoppinsSemiBold', color: '#257ae9' }}>
                            Clique aqui para acessar a nossa IA
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Dash;