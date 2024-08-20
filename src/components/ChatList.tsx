import { FC, useEffect, useState } from 'react'

import styles from './ChatList.module.css'
import { collection, query, where } from 'firebase/firestore'
import { auth, firestore } from '../firefaseConfig'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
    activeChatHandler: (chatId: string) => void
}

const ChatList: FC<Props> = ({ activeChatHandler }) => {
    const [user] = useAuthState(auth)

    const [querySnapshot, loading] = useCollection(
        query(
            collection(firestore, 'chats'),
            where('participants', 'array-contains', user?.uid)
        )
    )

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            {querySnapshot && querySnapshot?.docs.length > 0 ? (
                <ul>
                    {querySnapshot.docs.map((doc) => (
                        <li
                            onClick={() => activeChatHandler(doc.id)}
                            key={doc.id}
                        >
                            <img
                                className={styles.chatImg}
                                src={doc.data().photoURL}
                            />
                            <span>{doc.data().title}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No chats found</p>
            )}
        </div>
    )
}

export default ChatList
