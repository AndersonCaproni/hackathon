import { useInfos } from "../../../hooks/InfosProvider";
import Unifenas from '../../../assets/unifenas.png';
import robo from '../../../assets/robo.png';
import Moodle from '../../../assets/moodle.png';
import Gmail from '../../../assets/gmail.png';
import styles from './_dash.module.css'
import { borderRadius, display, fontFamily, fontSize, fontWeight, height, padding, textAlign, width } from "@mui/system";
import PortalProfessor from '../../../assets/portalProfessor.png'
import { ArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Efeito from '../../../components/Efeito/index'
import { Button } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { IconBrandReact } from '@tabler/icons-react';
import dayjs from 'dayjs';

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

    const getColorByLastAccess = (ultimoAcesso) => {
        const dias = dayjs().diff(dayjs(ultimoAcesso), 'day');

        if (dias > 15) return '#ff0000';
        if (dias > 5) return '#ffcc00';
        return '#33ff00';
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                paddingLeft: 0,
                paddingBottom: 6,
                paddingTop: 6,
                paddingRight: 6,
                display: "flex",
                flexDirection: "column",
                fontFamily: 'Poppins'
            }}>
            <Box>
                <Typography variant='h1' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>Seja bem-vindo de volta,</Typography>
                <Typography variant='h1' sx={{ fontSize: '3rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    {coordenador?.email &&
                        coordenador.email.split('@')[0].charAt(0).toUpperCase() + coordenador.email.split('@')[0].slice(1)
                    }
                </Typography>
            </Box>
            <Box
                sx={{
                    width: 'auto',
                    height: 'auto',
                    display: "flex",
                    flexDirection: "column",
                    gap: '1rem',
                    mt: '2rem'
                }}>
                <Box
                    sx={{
                        height: 'auto',
                        width: 'auto',
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <Box
                        sx={{
                            height: 'auto',
                            width: 'auto',
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <Box
                            sx={{
                                backgroundColor: '#257ae9',
                                height: '30rem',
                                width: '71rem',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: 'center',
                                borderRadius: '30px',
                                mb: '1rem',
                                mr: '1rem',
                                position: 'relative',
                                overflown: 'hidden',
                                p: 5,
                                gap: 9
                            }}>
                            <img src={robo} alt="robo" style={{ position: 'absolute', bottom: 0, right: 0, height: '30rem', width: 'auto', borderRadius: '30px' }} />
                            <Typography variant='h1' sx={{ color: '#fff', fontWeight: 'bold', fontSize: '2.65rem', fontFamily: 'Poppins' }}>Quer fazer uma pesquisa sobre <br />determinado assunto?</Typography>
                            <Typography variant='h1' sx={{ color: '#fff', fontSize: '1.57rem', fontFamily: 'Poppins' }}>Acesse nossa inteligência artificial para tirar<br />dúvidas, desenvolver ideias e muito mais. </Typography>
                            <Button
                                onClick={() => navigate('ia')}
                                sx={{
                                    width: '30rem',
                                    borderRadius: '30px',
                                    color: '#257ae9',
                                    //color: '#fff',
                                    padding: 2,
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    height: '10rem',
                                    display: 'flex',
                                    alignItens: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    backgroundColor: '#fff'

                                }}
                            //className={styles.reflexoAnimado}
                            >
                                <IconBrandReact size={48} className={styles.rotacao} />
                                Clique para acessar
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                height: 'auto',
                                width: 'auto',
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '30px',
                                    height: '20rem',
                                    width: '35rem',
                                    display: "flex",
                                    flexDirection: "column",
                                    mr: '1rem'
                                }}>

                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '30px',
                                    height: '20rem',
                                    width: '35rem',
                                    display: "flex",
                                    flexDirection: "column",
                                }}>

                            </Box>
                        </Box>

                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '30px',
                            height: '51rem',
                            width: '23rem',
                            overflowY: 'hidden'
                        }}>
                        <Box
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '30px',
                                height: '100%',
                                width: '100%',
                                display: "flex",
                                flexDirection: "column",
                                p: 4,
                                pl: 5,
                                overflowY: 'scroll',
                                gap: 2,
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                    backgroundColor: 'transparent',

                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgb(191, 201, 214)',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                },
                            }}>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'flex',
                                    alignItens: 'center',
                                    justifyContent: 'left',
                                    flexDirection: 'row',
                                    gap: 2,
                                    mb: 1
                                }}>
                                <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                <Typography onClick={() => { navigate('./alunos')}} variant='h5' sx={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.8' }}>Alunos</Typography>
                            </Box>
                            {alunos?.map((aluno, index) => {
                                const color = getColorByLastAccess(aluno?.user_lastaccess);

                                return (
                                    <Box key={index} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItens: 'center',
                                        justifyContent: 'left',
                                        gap: 1
                                    }}>
                                        <div
                                            style={{
                                                width: '1.7rem',
                                                height: '1.7rem',
                                                borderRadius: '100%',
                                                backgroundColor: color
                                            }}
                                        />
                                        <Typography onClick={() => { navigate('./alunos')}} sx={{ cursor: 'pointer', fontSize: '1.2rem' }}>{aluno?.name}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: 'auto',
                        width: 'auto',
                        display: "flex",
                        flexDirection: "row",
                        gap: '1rem'
                    }}>
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '30px',
                            height: '23rem',
                            width: '71rem',
                            display: "flex",
                            flexDirection: "column",
                        }}>

                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '30px',
                            height: '23rem',
                            width: '23rem',
                            display: "flex",
                            flexDirection: "column",
                        }}>

                    </Box>
                </Box>
            </Box>
            {/* <Box
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
                                    key={index}
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
                                        variant='h5'>
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
                        cursor: 'pointer',
                        position: 'relative'
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
                        <Efeito>

                        </Efeito>
                    </Box>
                </Box>
            </Box> */}
        </Box >
    )
}

export default Dash;