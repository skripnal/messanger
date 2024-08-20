import { collection, query, where } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, firestore } from '../firefaseConfig'
import { IoClose } from 'react-icons/io5'

import styles from './CreateChat.module.css'
import { createChat } from '../utils/chatEvents'
import { useAuthState } from 'react-firebase-hooks/auth'
import useFindUser from '../hooks/useFindUser'
import { User } from '../interfaces'

interface Props {
    activeChatHandler: (chatId: string) => void
    closeCreateChat: () => void
}

const CreateChat: FC<Props> = ({ activeChatHandler, closeCreateChat }) => {
    const [user] = useAuthState(auth)
    const [usernameInputValue, setUsernameInputValue] = useState<string>('')
    const [titleInputValue, setTitleInputValue] = useState<string>('')
    const findUsers = useFindUser(usernameInputValue)

    const createHandler = async (otherUser: string) => {
        ///
        if (user) {
            const chatId = await createChat(
                user.uid,
                otherUser,
                titleInputValue
            )
            if (chatId) activeChatHandler(chatId)
        }
    }

    return (
        <div className={styles.container}>
            <IoClose className={styles.close} onClick={closeCreateChat} />
            <input
                value={titleInputValue}
                onChange={(e) => setTitleInputValue(e.target.value)}
                type="text"
                placeholder="title"
            />
            <input
                type="text"
                placeholder="username"
                value={usernameInputValue}
                onChange={(e) => setUsernameInputValue(e.target.value)}
            />
            <div className={styles.findUserList}>
                {findUsers.map((user) => {
                    const typedUser = user as User
                    return (
                        <div
                            key={typedUser.uid}
                            className={styles.findUserListElement}
                        >
                            <img src={typedUser.photoURL} />
                            <p>{typedUser.username}</p>
                            <button
                                type="button"
                                className={styles.createChatButton}
                                onClick={() => createHandler(typedUser.uid)}
                            >
                                Create
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CreateChat
