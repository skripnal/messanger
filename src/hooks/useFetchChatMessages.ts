import {
    Timestamp,
    collection,
    doc,
    getDoc,
    orderBy,
    query,
} from 'firebase/firestore'
import { firestore } from '../firefaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'

interface MessageWithUser {
    seenBy: string[]
    senderId: string
    text: string
    timestamp: Timestamp
    user: {
        username: string
        photoURL: string
    }
}

const useFetchChatMessages = (chatId: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const messagesRef = collection(firestore, 'chats', chatId, 'messages')
    const q = query(messagesRef, orderBy('timestamp'))
    const [messages] = useCollectionData(q)

    const [messagesWithUser, setMessagerWithUser] = useState<MessageWithUser[]>(
        []
    )

    useEffect(() => {
        const fetchUsers = async () => {
            if (!messages) {
                setLoading(false)

                return
            }

            try {
                const messagesWithUserData = await Promise.all(
                    messages.map(async (message) => {
                        const userDoc = await getDoc(
                            doc(firestore, 'users', message.senderId)
                        )
                        const userData = userDoc.data()
                        return {
                            ...message,
                            user: userData,
                        } as MessageWithUser
                    })
                )
                setMessagerWithUser(messagesWithUserData)
            } catch (error) {
                console.log('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [messages])

    return [messagesWithUser, loading] as const
}

export default useFetchChatMessages
