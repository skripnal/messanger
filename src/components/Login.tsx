import { FC } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, firestore, provider } from '../firefaseConfig'

import { imagePlaceholder } from '../data/imgPlaceholder'
import styles from './Login.module.css'

const signInWithGoogle = async () => {
    try {
        const { user } = await signInWithPopup(auth, provider)
        const res = await getDoc(doc(firestore, 'users', user.uid))
        if (res.exists()) {
            return
        }

        await setDoc(doc(firestore, 'users', user.uid), {
            uid: user?.uid,
            createdAt: serverTimestamp(),
            username: '',
            photoURL: imagePlaceholder,
        })
    } catch (error) {
        console.error('Error during sign in:', error)
    }
}

const Login: FC = () => {
    return (
        <div className={styles.loginContaner}>
            <button type="button" onClick={signInWithGoogle}>
                Log in with Google
            </button>
        </div>
    )
}

export default Login
