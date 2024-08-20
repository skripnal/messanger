import { FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../utils/enums'
import { auth, firestore } from '../firefaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const Navbar: FC = () => {
    const [user] = useAuthState(auth)

    return (
        <div className={styles.navBarContainer}>
            {user ? (
                <div>
                    <div>{}</div>
                    <NavLink to={ROUTES.SETTINGS_ROUTE}>
                        <button type="button">Settings</button>
                    </NavLink>
                    <button onClick={() => auth.signOut()} type="button">
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <NavLink to={ROUTES.LOGIN_ROUTE}>
                        <button type="button">Log in</button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default Navbar
