import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore'
import { firestore } from '../firefaseConfig'

import photoPlaceholder from '../image-placeholder.jpg'

export const createChat = async (uid1: string, uid2: string, title: string) => {
    try {
        const chatRef = await addDoc(collection(firestore, 'chats'), {
            participants: [uid1, uid2],
            createdAt: serverTimestamp(),
            title: title,
            photoURL: photoPlaceholder,
        })
        return chatRef.id
    } catch (error) {
        console.error('Error creating chat:', error)
        return null
    }
}

export const sendMessage = async (
    chatId: string,
    senderId: string,
    text: string
) => {
    try {
        await addDoc(collection(firestore, 'chats', chatId, 'messages'), {
            senderId,
            text,
            timestamp: serverTimestamp(),
            seenBy: [senderId],
        })
    } catch (error) {
        console.error('Error sending message:', error)
    }
}

export const markMessageAsSeen = async (
    chatId: string,
    messageId: string,
    userId: string
) => {
    try {
        const messageRef = doc(
            firestore,
            'chats',
            chatId,
            'messages',
            messageId
        )
        await updateDoc(messageRef, {
            seenBy: arrayUnion(userId),
        })
    } catch (error) {
        console.error('Error marking message as seen:', error)
    }
}

export const fetchMessages = async (chatId: string) => {
    try {
        const messagesRef = collection(firestore, 'chats', chatId, 'messages')
        const q = query(messagesRef, orderBy('timestamp'))
        const querySnapshot = await getDocs(q)

        const messages = querySnapshot.docs.map((doc) => doc.data())
        return messages
    } catch (error) {
        console.error('Error fetching messages:', error)
        return []
    }
}

export const fetchChats = async (uid: string) => {
    try {
        const q = query(
            collection(firestore, 'chats'),
            where('participants', 'array-contains', uid)
        )
        const querySnapshot = await getDocs(q)
        const chats = querySnapshot.docs.map((doc) => ({
            chatId: doc.id,
            ...doc.data(),
        }))
        return chats
    } catch (error) {
        console.error('Error fetching messages:', error)
        return []
    }
}
