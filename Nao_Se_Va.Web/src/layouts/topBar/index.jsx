import styles from './_topBar.module.css'

export const TopBar = ({ children, style }) => {
    return (
        <div className={styles.corpo} style={style}>
            {children}
        </div>
    )
}