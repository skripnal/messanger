import React, { ChangeEvent, FC, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firefaseConfig'
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import useFetchUserById from '../hooks/useFetchUserById'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './Settings.module.css'
import { useNavigate } from 'react-router-dom'
import { useDocument } from 'react-firebase-hooks/firestore'

const Settings: FC = () => {
    const [usernameInput, setUsernameInput] = useState<string>('')
    const [photoURLInput, setPhotoURLInput] = useState<string>('')
    const [authUser] = useAuthState(auth)
    const userRef = authUser ? doc(firestore, 'users', authUser?.uid) : null
    const [userSnapshot, loading, error] = useDocument(userRef)
    const navigate = useNavigate()
    const [existUsenameError, setExistUsenameError] = useState<boolean>(false)

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                const result = reader.result as string
                setPhotoURLInput(result)
            }

            reader.onerror = (error) => {
                console.error('Error reading file:', error)
            }
        }
    }

    const saveUsername = async (userId: string) => {
        try {
            const querySnapshot = await getDocs(
                query(
                    collection(firestore, 'users'),
                    where('username', '==', usernameInput)
                )
            )

            if (!querySnapshot.empty) {
                setExistUsenameError(true)
                return
            } else {
                setExistUsenameError(false)
                setUsernameInput('')
            }
            const updateData: Record<string, any> = {}

            if (usernameInput) {
                updateData.username = usernameInput
            }

            if (photoURLInput) {
                updateData.photoURL = photoURLInput
            }

            await updateDoc(doc(firestore, 'users', userId), updateData)
        } catch (error) {
            console.log(error)
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    if (userSnapshot && userSnapshot.exists()) {
        const user = userSnapshot.data()
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <IoMdArrowRoundBack
                        onClick={goBack}
                        className={styles.titleBackButton}
                    />
                    <h1>Settings</h1>
                </div>
                {!photoURLInput ? (
                    <img className={styles.userImage} src={user?.photoURL} />
                ) : (
                    <img className={styles.userImage} src={photoURLInput} />
                )}
                <label className={styles.fileLabel}>
                    Change photo
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        accept="image/*"
                        multiple={false}
                    />
                </label>
                <p className={styles.username}>Username: {user?.username}</p>
                <label className={styles.changeUsernameLabel}>
                    Change username:
                    <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="username"
                    />
                </label>
                {existUsenameError && (
                    <p className={styles.usernameExistMessage}>
                        User with this username already exists!
                    </p>
                )}
                <button
                    className={styles.saveButton}
                    onClick={() => saveUsername(user?.uid)}
                >
                    Save
                </button>
            </div>
        )
    } else {
        return <div>User no found</div>
    }
}

export default Settings
