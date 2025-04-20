import styles from './_topBarLogOut.module.css'
import LogoAzul from '../../assets/logoAzulIcon.png'
import { useInfos } from '../../hooks/InfosProvider'
import { Box, IconButton } from '@mui/material';
import { Reorder } from '@mui/icons-material';

export const TopBarLogOut = ({ children, style }) => {
    return (
        <div className={styles.corpo} style={style}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img src={LogoAzul} alt="Logo" className={styles.logo} style={{ width: "5rem" }} />
            </Box>
            {children}
        </div>
    )
}