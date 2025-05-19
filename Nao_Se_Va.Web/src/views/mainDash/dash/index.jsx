import { useInfos } from "../../../hooks/InfosProvider";
import Unifenas from '../../../assets/unifenas.png';
import UnifenasEscrita from '../../../assets/unifenasEscrita.png';
import robo from '../../../assets/robo.png';
import Moodle from '../../../assets/moodle.png';
import Gmail from '../../../assets/gmail.png';
import styles from './_dash.module.css'
import { borderRadius, display, fontFamily, fontSize, fontWeight, height, padding, textAlign, width } from "@mui/system";
import PortalProfessor from '../../../assets/portalProfessor.png'
import { ArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Efeito from '../../../components/Efeito/index'
import { Button, IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { IconBrandReact, IconMessageChatbotFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { LineChart } from "@mui/x-charts";
import Loading from "../../../components/Loading";

const Dash = () => {

    const [labels, setLabels] = useState([])
    const [dias, setDias] = useState([])
    const [acessosPorDia, setAcessosPorDia] = useState([])

    const {
        Box,
        Typography,
        coordenador,
        alunos,
        Tooltip,
        AutoAwesome,
        navigate,
        setLoadingSupremo
    } = useInfos()


    useEffect(() => {
        setLoadingSupremo(true)
        const dias1 = Array.from({ length: 30 }, (_, i) =>
            dayjs().subtract(29 - i, 'day').format('YYYY-MM-DD'))
        setAcessosPorDia(
            dias1?.map((dia) => {
                const count = alunos?.filter((aluno) =>
                    dayjs(aluno?.user_lastaccess).isSame(dia, 'day')
                ).length;
                return count;
            }))
        setDias(dias1);
        setLabels(dias1.map((d) => dayjs(d).format('DD/MM')))
        setLoadingSupremo(false)
    }, [alunos])


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
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    pr: 6
                }}
            >
                <Box>
                    <Typography variant='h1' sx={{ fontSize: '1.4rem', fontFamily: 'Poppins' }}>Seja bem-vindo de volta,</Typography>
                    <Typography variant='h1' sx={{ fontSize: '3rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                        {coordenador?.email &&
                            coordenador.email.split('@')[0].charAt(0).toUpperCase() + coordenador.email.split('@')[0].slice(1)
                        }
                    </Typography>
                </Box>
                <Box>
                    <IconButton
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
                                overflow: 'hidden',
                                p: 5,
                                gap: 9
                            }}>
                            <img className={styles.roboAnimado} src={robo} alt="robo" style={{ position: 'absolute', bottom: 0, right: 0, height: '30rem', width: 'auto', borderRadius: '30px' }} />
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
                                    alignItems: 'center',
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
                                    mr: '1rem',
                                    p: 4,
                                    pl: 5
                                }}>

                                {
                                    !alunos ?
                                        <Loading loading={!alunos} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                                    mb: 1
                                                }}
                                            >
                                                <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                                <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Balanço</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        width: 'calc(100% - 1rem)'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '6rem',
                                                            fontFamily: 'Poppins',
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        {(alunos?.filter(aluno => {
                                                            const dias = dayjs().diff(dayjs(aluno.user_lastaccess), 'day');
                                                            return dias > 10;
                                                        }))?.length}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'row',
                                                            gap: 1
                                                        }}
                                                    >
                                                        <div style={{ width: '1rem', height: '1rem', borderRadius: '100%', backgroundColor: '#ff0000' }}></div>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.5rem',
                                                                fontFamily: 'Poppins',
                                                                m: 0,
                                                                p: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                            Ausentes
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <div style={{ width: '2px', height: '100%', backgroundColor: '#257ae9' }} />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '6rem',
                                                            fontFamily: 'Poppins',
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        {(alunos?.filter(aluno => {
                                                            const dias = dayjs().diff(dayjs(aluno.user_lastaccess), 'day');
                                                            return dias < 10;
                                                        }))?.length}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'row',
                                                            gap: 1
                                                        }}
                                                    >
                                                        <div style={{ width: '1rem', height: '1rem', borderRadius: '100%', backgroundColor: '#33ff00' }}></div>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.5rem',
                                                                fontFamily: 'Poppins',
                                                                m: 0,
                                                                p: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                            Ativos
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </>
                                }
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '30px',
                                    height: '20rem',
                                    width: '35rem',
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 4,
                                    ol: 5
                                }}>
                                {
                                    !alunos ?
                                        <Loading loading={!alunos} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                                    mb: 1
                                                }}
                                            >
                                                <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                                <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Total de Alunos</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        width: 'calc(100% - 1rem)'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '6rem',
                                                            fontFamily: 'Poppins',
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        {alunos?.length}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'row',
                                                            gap: 1
                                                        }}
                                                    >
                                                        <div style={{ width: '1rem', height: '1rem', borderRadius: '100%', backgroundColor: '#2196f3' }}></div>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.5rem',
                                                                fontFamily: 'Poppins',
                                                                m: 0,
                                                                p: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                            Alunos
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </>
                                }
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
                            {
                                !alunos ?
                                    <Loading loading={!alunos} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                                mb: 1
                                            }}>
                                            <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                            <Typography onClick={() => { navigate('./alunos') }} variant='h5' sx={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.8', fontFamily: 'Poppins' }}>Alunos</Typography>
                                        </Box>
                                        {alunos?.map((aluno, index) => {
                                            const color = getColorByLastAccess(aluno?.user_lastaccess);

                                            return (
                                                <Box key={index} sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: 'center',
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
                                                    <Typography onClick={() => { navigate(`./alunos/${aluno?.user_id}/detalhe`) }} sx={{ cursor: 'pointer', fontSize: '1.2rem', fontFamily: 'Poppins' }}>{aluno?.name}</Typography>
                                                </Box>
                                            );
                                        })}
                                    </>
                            }
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
                            p: 4
                        }}>

                        {
                            !alunos ?
                                <Loading loading={!alunos} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
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
                                            mb: 1
                                        }}
                                    >
                                        <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                                        <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Acessos</Typography>
                                    </Box>
                                    <LineChart
                                        xAxis={[{ data: labels, scaleType: 'point' }]}
                                        series={[
                                            {
                                                data: acessosPorDia,
                                                label: 'Acessos por dia',
                                                showMark: true,
                                            },
                                        ]}
                                        height={270}
                                        grid={{ vertical: true, horizontal: true }}
                                        tooltip={{ trigger: 'axis' }}
                                    />
                                </>
                        }
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '30px',
                            height: '23rem',
                            width: '23rem',
                            display: "flex",
                            flexDirection: "column",
                            p: 4,
                            gap: 3
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                flexDirection: 'row',
                                gap: 2,
                                mb: 1
                            }}
                        >
                            <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '1.8rem', color: '#2196f3' }} />
                            <Typography variant='h4' sx={{ fontSize: '1.8rem', fontFamily: 'Poppins', fontWeight: 'bold' }}>Links úteis</Typography>
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
                                    flexDirection: 'column',
                                    gap: 2,
                                    mb: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'left',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mb: 1
                                    }}
                                >
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
                                            width: '6rem',
                                            height: '6rem',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
                                            position: 'relative',
                                            zIndex: 1,
                                            '&:hover .hover-text': {
                                                opacity: 1,
                                            }
                                        }}
                                            onClick={() => {
                                                window.open('https://www.unifenas.br/', '_blank');
                                            }}
                                        >
                                            <img className={styles.foto} src={UnifenasEscrita} alt="Unifenas" />
                                            <Box
                                                className="hover-text"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    fontSize: '0.8rem',
                                                    padding: '0.3rem',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    zIndex: 2
                                                }}
                                            >
                                                Unifenas
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'left',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mb: 1
                                    }}
                                >
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
                                            width: '6rem',
                                            height: '6rem',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
                                            position: 'relative',
                                            zIndex: 1,
                                            '&:hover .hover-text': {
                                                opacity: 1,
                                            }
                                        }}
                                            onClick={() => {
                                                window.open('https://unifenas.lyceum.com.br/DOnline/DOnline/avisos/TDOL303D.tp', '_blank');
                                            }}
                                        >
                                            <img className={styles.foto2} src={Unifenas} alt="Unifenas" />
                                            <Box
                                                className="hover-text"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    fontSize: '0.8rem',
                                                    padding: '0.3rem',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    zIndex: 2
                                                }}
                                            >
                                                Portal do Professor
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'left',
                                    flexDirection: 'column',
                                    gap: 2,
                                    mb: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'left',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mb: 1
                                    }}
                                >
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
                                            width: '6rem',
                                            height: '6rem',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
                                            position: 'relative',
                                            zIndex: 1,
                                            '&:hover .hover-text': {
                                                opacity: 1,
                                            }
                                        }}
                                            onClick={() => {
                                                window.open('https://moodle.unifenas.br/login/index.php', '_blank');
                                            }}
                                        >
                                            <img className={styles.foto2} src={Moodle} alt="Unifenas" />
                                            <Box
                                                className="hover-text"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    fontSize: '0.8rem',
                                                    padding: '0.3rem',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    zIndex: 2
                                                }}
                                            >
                                                Moodle
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'left',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mb: 1
                                    }}
                                >
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
                                            width: '6rem',
                                            height: '6rem',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
                                            position: 'relative',
                                            zIndex: 1,
                                            '&:hover .hover-text': {
                                                opacity: 1,
                                            }
                                        }}
                                            onClick={() => {
                                                window.open('https://www.gmail.com', '_blank');
                                            }}
                                        >
                                            <img className={styles.foto2} src={Gmail} alt="Unifenas" />
                                            <Box
                                                className="hover-text"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    fontSize: '0.8rem',
                                                    padding: '0.3rem',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    zIndex: 2
                                                }}
                                            >
                                                Gmail
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Dash;