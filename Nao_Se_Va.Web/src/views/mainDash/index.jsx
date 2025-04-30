import { Padding } from '@mui/icons-material';
import { useInfos } from '../../hooks/InfosProvider';
import styles from './_mainDash.module.css';


export const MainDash = () => {
    const {
        TopBar,
        SideBar,
        Outlet,
        Box,
        Fade,
        IconButton,
        Paper,
        Popper,
        Typography,
        LoginTwoTone,
        PermIdentityOutlined,
        loadingSupremo,
        setLoadingSupremo,
        SettingsTwoTone,
        Breadcrumbs,
        navigate,
        anchorEl,
        open,
        placement,
        buttonRef,
        popperRef,
        navigation,
        handleClick,
        Button,
        openSide,
        toggleDrawer,
        LinearProgress,
        coordenador
    } = useInfos();

    return (
        <div className={styles.corpo}>
            <TopBar>
                <Box
                    ref={buttonRef}
                    onClick={handleClick('bottom-end')}
                    sx={{
                        width: "5.6rem",
                        height: "3.1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backgroundColor: "#257ae9",
                        border: "solid 2px #257ae9",
                        borderRadius: "40px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        "&:hover .icon1": {
                            color: "#257ae9"
                        },
                        "&:hover .icon2": {
                            color: "#ffffff"
                        },
                        "&:hover .icon-button": {
                            backgroundColor: "#257ae9"
                        },
                        "&:hover": {
                            backgroundColor: "#ffffff",
                        }
                    }}>
                    <SettingsTwoTone className="icon1" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#ffffff" }} />
                    <IconButton sx={{
                        backgroundColor: "#ffffff",
                        p: 0,
                        width: "2.3rem",
                        height: "2.3rem",
                    }}
                        className="icon-button">
                        <PermIdentityOutlined className="icon2" fontSize="inherit" sx={{ fontSize: "1.7rem", color: "#257ae9" }} />
                    </IconButton>
                </Box>
                <Popper
                    ref={popperRef}
                    sx={{
                        zIndex: 1200,
                        minWidth: '350px'
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper sx={{
                                marginTop: 0.5,
                                p: 3,
                                borderRadius: "20px",
                                width: "auto",
                                border: "none",
                                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Typography sx={{ cursor: 'default', borderBottom: "solid rgb(211, 211, 211) 1px", width: '100%', textAlign: 'center', padding: 2 }}>
                                    {coordenador?.nome}
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 3,
                                    width: "100%",
                                    cursor: "pointer",
                                    p: 2,
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "10px",
                                        color: '#257ae9'
                                    }
                                }}
                                    onClick={() => navigate('perfil')}>
                                    <PermIdentityOutlined />
                                    <Typography variant='h7'>
                                        Perfil
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 3,
                                    cursor: "pointer",
                                    p: 2,
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "10px",
                                        color: '#257ae9'
                                    }
                                }}
                                    onClick={() => navigate("/")}
                                >
                                    <LoginTwoTone />
                                    <Typography variant='h7'>
                                        Sair
                                    </Typography>
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </TopBar>
            <SideBar>
                <Breadcrumbs
                    navigation={navigation}
                    icons
                    title
                    rightAlign
                />
                <Box sx={{
                    display: "flex",
                    backgroundColor: "#ffffff",
                    width: "calc(100% - 1rem)",
                    minHeight: "calc(100% - 9rem)",
                    borderRadius: "10px",
                    boxShadow: "4px 4px 10px 0px rgba(37, 122, 233, 0.4)",
                    mb: 1.5,
                    position: 'relative',
                    overflow: "hidden",
                }}>
                    {
                        loadingSupremo ?
                            <LinearProgress
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    zIndex: 99
                                }}
                            /> :

                            <Outlet />
                    }
                </Box>
            </SideBar>
        </div>
    )
}