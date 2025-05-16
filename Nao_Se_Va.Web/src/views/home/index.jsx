import styles from './_home.module.css'
import { TopBarLogOut } from '../../layouts/topBarLogOut'
import { Botao } from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import fundoCadeira from '../../assets/fundoCadeira.png'
import fundoAluno from '../../assets/fundoAluno.png'
import fundoMulher from '../../assets/fundoMulher.png'
import WorkOffIcon from '@mui/icons-material/WorkOff';
import GroupOffIcon from '@mui/icons-material/GroupOff';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GridViewIcon from '@mui/icons-material/GridView';


export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.corpo}>
            <Box
                sx={{
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
                    <Box
                        sx={{
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: '#257ae9',
                            gap: 1
                        }}
                    >
                        <Button variant="text" size={"large"} href="#sessaoDestino1" style={{ color: "#257ae9", fontWeight: "bold", margin: 0, width: '100%', borderRadius: '50px' }}>
                            O Problema
                        </Button>
                        |
                        <Button variant="text" size={"large"} href="#sessaoDestino2" style={{ color: "#257ae9", fontWeight: "bold", margin: 0, width: '100%', borderRadius: '50px' }}>
                            Visão Geral
                        </Button>
                        |
                        <Button variant="text" size={"large"} href="#sessaoDestino3" style={{ color: "#257ae9", fontWeight: "bold", margin: 0, width: '100%', borderRadius: '50px' }}>
                            O que é?
                        </Button>
                        |
                        <Button variant="text" size={"large"} href="#sessaoDestino4" style={{ color: "#257ae9", fontWeight: "bold", margin: 0, width: '100%', borderRadius: '50px' }}>
                            Benefícios
                        </Button>
                        |
                        <Button variant="text" size={"large"} href="#sessaoDestino5" style={{ color: "#257ae9", fontWeight: "bold", margin: 0, width: '100%', borderRadius: '50px' }}>
                            Informações
                        </Button>
                    </Box>
                    <Button variant="outlined" size={"large"} style={{ backgroundColor: '#257ae9', color: "#ffffff", fontWeight: "bold", margin: 0, borderRadius: '50px' }} onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </TopBarLogOut>
                <Box
                    id="sessaoDestino1"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '980px',
                        backgroundImage: `url(${fundoCadeira})`,
                        backgroundSize: 'cover', // contain
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                        boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.7)',
                    }}
                >
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
                                    cursor: 'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.009)',
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
                                    cursor: 'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.009)',
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
                                    cursor: 'pointer',
                                    transition: '0.3s ease',
                                    '&:hover': {
                                        transition: '0.3s ease',
                                        transform: 'scale(1.009)',
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
                <Box
                    id="sessaoDestino2"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '950px',
                        width: '100%',
                        backgroundImage: 'linear-gradient(90deg, #257ae9, #ffffff)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '80%',
                            gap: 6
                        }}
                    >
                        <Typography variant='h1' sx={{ width: '100%', fontSize: '4rem', fontWeight: 'bold', color: '#ffffff', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Visão Geral</Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: 'auto',
                                width: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '30rem',
                                    width: '45rem',
                                    backgroundImage: 'linear-gradient(to top left, transparent, white)',
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 'auto',
                                        width: 'auto',
                                        padding: 10,
                                        paddingRight: 0,
                                        paddingLeft: 0,
                                        gap: 2
                                    }}
                                >
                                    <Typography variant='h1' sx={{ width: '23rem', fontSize: '2.4rem', fontWeight: 'bold', color: '#257ae9', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>
                                        Quem somos?
                                    </Typography>
                                    <Typography variant='h1' sx={{ lineHeight: '1.5', width: '23rem', fontSize: '1.3rem', color: '#000000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>
                                        Somos uma equipe dedicada à prevenção da evasão escolar. Utilizamos dados e tecnologia para apoiar a escola na identificação de riscos, no acompanhamento dos estudantes e na promoção de ações que incentivem a permanência na escola.
                                        Nosso objetivo é garantir que cada aluno tenha a oportunidade de concluir sua trajetória educacional com sucesso.
                                    </Typography>
                                </Box>
                                <InfoOutlineIcon sx={{ fontSize: '15rem', m: 0, p: 0, color: "#257ae9" }} />
                            </Box>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '30rem',
                                    width: '45rem',
                                    backgroundImage: 'linear-gradient(to top left, #257ae9, transparent)',
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 'auto',
                                        width: 'auto',
                                        padding: 10,
                                        paddingRight: 0,
                                        paddingLeft: 0,
                                        gap: 2
                                    }}
                                >
                                    <Typography variant='h1' sx={{ width: '23rem', fontSize: '2.4rem', fontWeight: 'bold', color: '#257ae9', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>
                                        Nossos valores.
                                    </Typography>
                                    <Typography variant='h1' sx={{ lineHeight: '1.5', width: '23rem', fontSize: '1.3rem', color: '#000000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>
                                        Acreditamos que a educação transforma vidas e que cada aluno importa. Valorizamos a educação como direito de todos e acreditamos na parceria entre escola, família e comunidade para enfrentar a evasão escolar. Atuamos com empatia, responsabilidade e compromisso com a inclusão, sempre focados no bem-estar e no sucesso dos estudantes.
                                    </Typography>
                                </Box>
                                <VolunteerActivismIcon sx={{ fontSize: '15rem', m: 0, p: 0, color: "#ffffff" }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    id="sessaoDestino3"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '980px',
                        backgroundImage: `url(${fundoAluno})`,
                        backgroundSize: 'cover', // contain
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                        boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            justifyContent: 'center',
                            height: '100%',
                            width: '80%',
                            zIndex: 1,
                            gap: 5
                        }}>
                        <Box
                            sx={{
                                width: '40%',
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
                                O que é a evasão escolar?
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '40%',
                                height: 'auto',
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: '1.2rem',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    fontFamily: 'Poppins',
                                    cursor: 'default',
                                    lineHeight: '1.5'
                                }}>
                                A evasão escolar acontece quando um estudante abandona a escola antes de concluir a etapa de ensino em que está matriculado, sem realizar a transferência para outra instituição.
                                Muitas vezes, a evasão é resultado de uma combinação de fatores, como dificuldades financeiras, desmotivação, problemas familiares, falta de apoio escolar ou situações de vulnerabilidade social. Cada caso tem suas particularidades, e por isso, é fundamental acompanhar os alunos de perto e agir de forma preventiva.
                                <br />Nosso objetivo é apoiar os educadores no monitoramento da frequência e do engajamento dos estudantes, oferecendo ferramentas que ajudem a identificar sinais de risco e a tomar decisões mais rápidas e eficazes. Prevenir a evasão é garantir que todos tenham a chance de concluir seus estudos e construir um futuro com mais oportunidades.
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => navigate('/login')}
                            variant="contained"
                            sx={{
                                backgroundColor: '#ffffff',
                                width: '20rem',
                                borderRadius: '50px',
                                color: '#257ae9',
                                padding: 2,
                                fontSize: '1rem',
                                fontWeight: 'bold',

                            }}
                        >
                            Acessar painel do Professor
                        </Button>
                    </Box>
                </Box>
                <Box
                    id="sessaoDestino4"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '990px',
                        width: '100%',
                        backgroundImage: 'linear-gradient(90deg, #257ae9, #ffffff)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '80%',
                            gap: 4
                        }}
                    >
                        <Typography variant='h1' sx={{ width: '100%', fontSize: '4.5rem', fontWeight: 'bold', color: '#ffffff', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Como podemos te ajudar?</Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'top',
                                height: 'auto',
                                width: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    alignSelf: 'flex-start',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 'auto',
                                    width: 'auto',
                                    backgroundImage: 'linear-gradient(to top left, transparent, white)',
                                    borderRadius: 2,
                                    padding: 4,
                                    gap: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'left',
                                        height: 'auto',
                                        width: 'auto',
                                        gap: 5
                                    }}
                                >
                                    <GridViewIcon sx={{ transform: 'rotate(45deg)', fontSize: '2rem', color: '#2196f3' }} />
                                    <Typography variant='h1' sx={{ fontSize: '1.2rem', width: '25rem', lineHeight: 1.8, color: '#000000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>
                                        • Monitoramento de frequência em tempo real
                                        <br />
                                        •  Identificação de padrões de evasão
                                        <br />
                                        • Registro de causas da evasão
                                        <br />
                                        • Alertas e notificações para professores
                                        <br />
                                        • Comunicação com responsáveis
                                        <br />
                                        • Histórico escolar e social do aluno
                                        <br />
                                        • Relatórios gerenciais e dashboards
                                        <br />
                                        • Acesso seguro e personalizado
                                        <br />
                                        • Inteligência Artificial própria
                                    </Typography>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#257ae9',
                                            width: '10rem',
                                            borderRadius: '50px',
                                            color: '#ffffff',
                                            padding: 1,
                                            fontSize: '1rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Entrar
                                    </Button>
                                </Box>
                            </Box>
                            <img src={fundoMulher} alt="Fundo Aluno" style={{ width: '50rem', height: 'auto', borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Box>
                <Box
                    id="sessaoDestino5"
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'auto',
                        width: '100%',
                        padding: '2rem 0 2rem 0',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '80%',
                            gap: 2
                        }}
                    >
                        <Typography variant='h1' sx={{ width: '100%', fontSize: '3rem', fontWeight: 'bold', color: '#257ae9', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Informações gerais</Typography>
                        <div style={{ height: '2px', width: '100%', backgroundImage: 'linear-gradient(90deg,rgb(0, 0, 0), rgba(0, 0, 0,0))' }}></div>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'top',
                                height: 'auto',
                                width: '100%',
                                margin: '1.5rem',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                    height: 'auto',
                                    width: 'auto',
                                    gap: 2,
                                    textAlign: 'cente'
                                }}
                            >
                                <Typography variant='h1' sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Projeto:</Typography>
                                <Typography variant='h1' sx={{ fontSize: '1rem', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>VII Hackathon</Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                    height: 'auto',
                                    width: 'auto',
                                    gap: 2,
                                    textAlign: 'cente'
                                }}
                            >
                                <Typography variant='h1' sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Tema:</Typography>
                                <Typography variant='h1' sx={{ fontSize: '1rem', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Evasão Escolar</Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                    height: 'auto',
                                    width: 'auto',
                                    gap: 2,
                                    textAlign: 'cente'
                                }}
                            >
                                <Typography variant='h1' sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Desenvolvedores:</Typography>
                                <Typography variant='h1' sx={{ fontSize: '1rem', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Anderson Caproni<br />João Paulo Silva<br />João Pedro Cassiano<br />Kawe Henrique<br />Thiago Silva</Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                    height: 'auto',
                                    width: 'auto',
                                    gap: 2,
                                    textAlign: 'cente'
                                }}
                            >
                                <Typography variant='h1' sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>Linguagens:</Typography>
                                <Typography variant='h1' sx={{ fontSize: '1rem', color: '#000', textAlign: 'left', fontFamily: 'Poppins', cursor: 'default' }}>React<br />Node.js</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}