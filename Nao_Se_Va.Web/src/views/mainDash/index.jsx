import { Padding } from '@mui/icons-material';
import { useInfos } from '../../hooks/InfosProvider';
import styles from './_mainDash.module.css';
import { useEffect } from 'react';


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
            <SideBar>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    minHeight: "100%",
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