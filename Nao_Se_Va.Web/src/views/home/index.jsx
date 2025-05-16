import styles from './_home.module.css'
import { TopBarLogOut } from '../../layouts/topBarLogOut'
import { Botao } from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import fundoCadeira from '../../assets/fundoCadeira.png'
import WorkOffIcon from '@mui/icons-material/WorkOff';
import GroupOffIcon from '@mui/icons-material/GroupOff';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.corpo}>
            <Box
                sx={{
                    flexGrow: 1,
                    position: 'relative',
                    overflowY: 'scroll',
                    height: "100vh",
                    width: '100%',
                    '&::-webkit-scrollbar': {
                        width: '7px',
                        backgroundColor: 'transparent',

                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#257ae9',
                        borderRadius: '10px',
                        cursor: 'pointer',
                    },
                }}
            >
                <TopBarLogOut>
                    <Button variant="outlined" size={"large"} style={{ color: "#257ae9", fontWeight: "bold", margin: 0 }} onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </TopBarLogOut>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <img src={fundoCadeira} alt="Fundo Cadeira" style={{ width: "100%", height: "auto", position: 'absolute', top: 0, left: 0 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            justifyContent: 'center',
                            height: '100%',
                            width: '80%',
                            zIndex: 1,
                            gap: 3
                        }}>
                        <Box
                            sx={{
                                width: '60%',
                                height: 'auto',
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: '4rem',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    fontFamily: 'Poppins',
                                    cursor: 'default'
                                }}>
                                Quando a escola deixa de ser um lugar de futuro
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '60%',
                                height: 'auto',
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: '1rem',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    fontFamily: 'Poppins',
                                    cursor: 'default'
                                }}>
                                Todos os dias, milhares de jovens abandonam as salas de aula, levando com eles sonhos interrompidos. A evasão escolar é silenciosa, mas seus impactos ecoam por gerações.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 'auto', width: '100%', zIndex: 1, mt: 8 }}>
                            <Box
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                    width: '30rem',
                                    height: '15rem',
                                    borderRadius: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 2,
                                    cursor:'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.005)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '4rem',
                                        height: '4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        zIndex: 1,
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: 2,
                                            padding: '2px',
                                            background: `
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%)
      `,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: `
        4px 100%, /* esquerda */
        100% 4px, /* topo */
        4px 100%  /* direita */
      `,
                                            backgroundPosition: `
        left center,
        top center,
        right center
      `,
                                            zIndex: 0,
                                        },
                                    }}
                                >
                                    <WorkOffIcon sx={{ fontSize: '2rem', m: 0, p: 0, color: "#257ae9" }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                        gap: 2
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: '#ffffff',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        Desemprego e baixa renda
                                    </Typography>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        Pessoas que abandonam a escola têm mais dificuldade para conseguir empregos qualificados e bem remunerados. Sem escolaridade básica, as oportunidades no mercado de trabalho são limitadas, o que contribui para ciclos de pobreza e exclusão social.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                    width: '30rem',
                                    height: '15rem',
                                    borderRadius: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 2,
                                    cursor:'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.005)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '4rem',
                                        height: '4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        zIndex: 1,
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: 2,
                                            padding: '2px',
                                            background: `
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%)
      `,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: `
        4px 100%, /* esquerda */
        100% 4px, /* topo */
        4px 100%  /* direita */
      `,
                                            backgroundPosition: `
        left center,
        top center,
        right center
      `,
                                            zIndex: 0,
                                        },
                                    }}
                                >
                                    <GroupOffIcon sx={{ fontSize: '2rem', m: 0, p: 0, color: "#257ae9" }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                        gap: 2
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: '#ffffff',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        Aumento da desigualdade social
                                    </Typography>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        A evasão escolar perpetua a desigualdade: quem sai da escola cedo geralmente tem menos acesso a serviços, tecnologia e cidadania plena. Isso reforça a divisão entre grupos sociais e limita o desenvolvimento de comunidades inteiras.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                    width: '30rem',
                                    height: '15rem',
                                    borderRadius: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 2,
                                    cursor:'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.005)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '4rem',
                                        height: '4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        zIndex: 1,
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: 2,
                                            padding: '2px',
                                            background: `
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%),
        linear-gradient(to top, rgba(37, 122, 233, 0) 0%, rgba(37, 122, 233, 1) 100%)
      `,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: `
        4px 100%, /* esquerda */
        100% 4px, /* topo */
        4px 100%  /* direita */
      `,
                                            backgroundPosition: `
        left center,
        top center,
        right center
      `,
                                            zIndex: 0,
                                        },
                                    }}
                                >
                                    <LocalPoliceIcon sx={{ fontSize: '2rem', m: 0, p: 0, color: "#257ae9" }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                        gap: 2
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: '#ffffff',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        Vulnerabilidade à criminalidade
                                    </Typography>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '1rem',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            textAlign: 'left',
                                            fontFamily: 'Poppins',
                                            cursor: 'default'
                                        }}>
                                        Jovens fora da escola ficam mais expostos a ambientes de risco, como o envolvimento com drogas e violência. A falta de perspectiva educacional e profissional aumenta a chance de entrada em contextos de criminalidade ou marginalização.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}