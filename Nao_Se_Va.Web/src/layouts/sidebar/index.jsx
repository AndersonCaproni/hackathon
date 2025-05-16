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
import { People, ArrowRight, ArrowLeft, House, AutoAwesome, Message, MenuBook } from '@mui/icons-material';
import { useInfos } from '../../hooks/InfosProvider';
import styles from './_sideBar.module.css';

const drawerWidth = 240;

export function SideBar({ children }) {
    const {
        openSide,
        toggleDrawer,
        navigate,
        location
    } = useInfos();

    return (
        <Box className={styles.font} sx={{ display: 'flex', minHeight: "calc(100vh - 7rem)", marginTop: '7rem' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxShadow: "5px 5px 10px 0px rgba(37, 122, 233, 0.4)",
                        width: drawerWidth,
                        zIndex: "999 !important",
                        position: "relative !important",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openSide}
            >
                <List sx={{ fontFamily: 'Poppins !important' }}>
                    <ListItem sx={{ mb: 1, mt: 1 }} key={"Dash"} disablePadding onClick={() => navigate(".")}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                fontFamily: 'Poppins !important',
                                ...(location.pathname === '/dash' && { color: "#257ae9" })
                            }}>
                                <House />
                            </ListItemIcon>
                            <p style={{ margin: 0, marginTop: 2, marginBottom: 2, ...(location.pathname === '/dash' && { color: "#257ae9" }) }}>Dashboard</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mb: 1, mt: 1 }} key={"Alunos"} disablePadding onClick={() => navigate("alunos")}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                fontFamily: 'Poppins !important',
                                ...(location.pathname === '/dash/alunos' && { color: "#257ae9" })
                            }}>
                                <People />
                            </ListItemIcon>
                            <p style={{ margin: 0, marginTop: 2, marginBottom: 2, ...(location.pathname === '/dash/alunos' && { color: "#257ae9" }) }}>Alunos</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mb: 1, mt: 1 }} key={"Ia"} disablePadding onClick={() => navigate("ia")}>
                        <ListItemButton>
                            <ListItemIcon>
                                {
                                    location.pathname === '/dash/ia' ?
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <defs>
                                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2">
                                                        <animate attributeName="offset" values="1;0" dur="3s" repeatCount="indefinite" keyTimes="0;1" />
                                                    </stop>
                                                    <stop offset="0%" stopColor="#0080ff" stopOpacity="0.2" />
                                                    <stop offset="5%" stopColor="#0080ff" stopOpacity="0.3" />
                                                    <stop offset="10%" stopColor="#0080ff" stopOpacity="0.4" />
                                                    <stop offset="15%" stopColor="#0080ff" stopOpacity="0.5" />
                                                    <stop offset="40%" stopColor="#0080ff" stopOpacity="0.4" />
                                                    <stop offset="50%" stopColor="#0080ff" stopOpacity="0.2" />
                                                    <stop offset="60%" stopColor="#0080ff" stopOpacity="0.2" />
                                                    <stop offset="90%" stopColor="#0080ff" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                fill="url(#grad)"
                                                d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"
                                            />
                                        </svg>
                                        :
                                        <AutoAwesome />
                                }
                            </ListItemIcon>
                            <p
                                className={location.pathname === '/dash/ia' ? styles.reflexoAnimado : ''}
                                style={{
                                    margin: 0,
                                    marginTop: 2,
                                    marginBottom: 2,
                                }}
                            >
                                Chat IA
                            </p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mb: 1, mt: 1 }} key={"mensagem"} disablePadding onClick={() => navigate("mensagem")}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                fontFamily: 'Poppins !important',
                                ...(location.pathname === '/dash/mensagem' && { color: "#257ae9" })
                            }}>
                                <Message />
                            </ListItemIcon>
                            <p style={{ margin: 0, marginTop: 2, marginBottom: 2, ...(location.pathname === '/dash/mensagem' && { color: "#257ae9" }) }}>Mensagem</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mb: 1, mt: 1 }} key={"curso"} disablePadding onClick={() => navigate("curso")}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                fontFamily: 'Poppins !important',
                                ...(location.pathname === '/dash/curso' && { color: "#257ae9" })
                            }}>
                                <MenuBook />
                            </ListItemIcon>
                            <p style={{ margin: 0, marginTop: 2, marginBottom: 2, ...(location.pathname === '/dash/curso' && { color: "#257ae9" }) }}>Curso</p>
                        </ListItemButton>
                    </ListItem>
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
                    height: "calc(100vh - 7rem)",
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
                <Box sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: '#cdd0d4',
                    position: 'absolute',
                    top: '2.8rem',
                    left: '0',
                    zIndex: 9999,
                    borderRadius: '0px 10px 10px 0px'
                }}>
                    <IconButton onClick={toggleDrawer} sx={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                        {openSide ? <ArrowLeft sx={{ fontSize: '2rem', color: '#fffff' }} /> : <ArrowRight sx={{ fontSize: '2rem', color: '#fffff' }} />}
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Box >
    );
}
