import styles from './_topBar.module.css'
import LogoAzul from '../../assets/logoAzulIcon.png'

export const TopBar = ({ children, style }) => {
    return (
        <div className={styles.corpo} style={style}>
            <img src={LogoAzul} alt="Logo" className={styles.logo} style={{width: "5rem"}}/>
            {children}
        </div>
    )
}