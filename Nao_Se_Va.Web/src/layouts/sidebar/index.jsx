import {
    Box,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton
} from '@mui/material';
import { School, ArrowRight, ArrowLeft, House, SettingsRounded, AutoAwesome,HelpOutlineRounded, EmailRounded, MenuBook } from '@mui/icons-material';
import { useInfos } from '../../hooks/InfosProvider';
import styles from './_sideBar.module.css';
import LogoAzul from '../../assets/logoAzulIcon.png'
import { ButtonBase } from '@mui/material';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

const drawerWidth = 300;

export function SideBar({ children }) {
    const {
        openSide,
        toggleDrawer,
        navigate,
        location
    } = useInfos();

    return (
        <Box className={styles.font} sx={{ display: 'flex', minHeight: "100vh" }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    margin: 3,
                    '& .MuiDrawer-paper': {
                        boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                        width: drawerWidth,
                        zIndex: "999 !important",
                        position: "relative !important",
                        borderRadius: '30px',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openSide}
            >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                    <img src={LogoAzul} alt='logo' style={{ width: '7rem' }} />
                </Box>
                <List sx={{ fontFamily: 'Poppins !important', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                    <ButtonBase
                        onClick={() => navigate(".")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname === '/dash' ? "#257ae9" : 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ArticleRoundedIcon sx={{ transform: 'rotate(270deg)', color: location.pathname === '/dash' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins !important',
                            color: location.pathname === '/dash' ? "#ffffff" : '#257ae9'
                        }}>
                            Dashboard
                        </p>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => navigate("alunos")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname === '/dash/alunos' ? "#257ae9" : 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash/alunos' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <School sx={{ color: location.pathname === '/dash/alunos' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins !important',
                            color: location.pathname === '/dash/alunos' ? "#ffffff" : '#257ae9'
                        }}>
                            Aluno
                        </p>
                    </ButtonBase>
                    <ButtonBase
                        className={location.pathname === '/dash/ia' ? styles.reflexoAnimado : ''}
                        onClick={() => navigate("ia")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname !== '/dash/ia' && 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash/ia' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <AutoAwesome sx={{ color: location.pathname === '/dash/ia' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p
                            style={{
                                width: '70%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                fontFamily: 'Poppins !important',
                                color: location.pathname === '/dash/ia' ? "#ffffff" : '#257ae9'
                            }}>
                            Chat IA
                        </p>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => navigate("mensagem")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname === '/dash/mensagem' ? "#257ae9" : 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash/mensagem' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <EmailRounded sx={{ color: location.pathname === '/dash/mensagem' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins !important',
                            color: location.pathname === '/dash/mensagem' ? "#ffffff" : '#257ae9'
                        }}>
                            Mensagem
                        </p>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => navigate("duvidas")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname === '/dash/duvidas' ? "#257ae9" : 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash/duvidas' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <HelpOutlineRounded sx={{ color: location.pathname === '/dash/duvidas' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins !important',
                            color: location.pathname === '/dash/duvidas' ? "#ffffff" : '#257ae9'
                        }}>
                            Dúvidas
                        </p>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => navigate("perfil")}
                        sx={{
                            width: '250px',
                            height: '80px',
                            borderRadius: '30px',
                            display: 'block',
                            textAlign: 'left',
                            height: '80px',
                            backgroundColor: location.pathname === '/dash/perfil' ? "#257ae9" : 'transparent',
                            transition: 'background-color 0.3s ease',
                            fontFamily: 'Poppins !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            '&:hover': {
                                backgroundColor: location.pathname !== '/dash/perfil' && '#e0e0e0',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '30%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SettingsRounded sx={{ color: location.pathname === '/dash/perfil' ? "#ffffff" : '#257ae9', m: 0, p: 0, fontSize: '2rem' }} />
                        </Box>
                        <p style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            fontFamily: 'Poppins !important',
                            color: location.pathname === '/dash/perfil' ? "#ffffff" : '#257ae9'
                        }}>
                            Configurações
                        </p>
                    </ButtonBase>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingLeft: 2,
                    position: 'relative',
                    transition: 'margin .2s',
                    marginLeft: openSide ? 0 : `-${drawerWidth}px`,
                    overflowY: 'scroll',
                    height: "100vh",
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
                {children}
            </Box>
        </Box >
    );
}
