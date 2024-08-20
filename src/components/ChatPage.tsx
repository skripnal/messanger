import { FC, useState } from 'react'
import styles from './ChatPage.module.css'
import ChatList from './ChatList'
import Chat from './Chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firefaseConfig'
import EmptyChat from './EmptyChat'
import { sendMessage } from '../utils/chatEvents'

const ChatPage: FC = () => {
    const [user] = useAuthState(auth)
    const [activeChat, setActiveChat] = useState<string>('')

    const activeChatHandler = (chatId: string): void => {
        console.log('activeChatHandler INIT')

        setActiveChat(chatId)
        console.log(`Active chat: ${chatId}`)

        console.log('activeChatHandler EXIT')
    }

    const backToEmtyChat = () => {
        setActiveChat('')
    }

    return (
        <div className={styles.container}>
            <ChatList activeChatHandler={activeChatHandler} />
            {activeChat === '' ? (
                <EmptyChat activeChatHandler={activeChatHandler} />
            ) : (
                <Chat chatId={activeChat} backToEmtyChat={backToEmtyChat} />
            )}
        </div>
    )
}

export default ChatPage
