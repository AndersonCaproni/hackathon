import { Outlet } from 'react-router-dom'
import styles from './_mainView.module.css'
export const MainView = () => {
    return (
        <div className={styles.corpo}>
            <Outlet/>
        </div>
    )
}