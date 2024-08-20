import { FC, useState } from 'react'

import CreateChat from './CreateChat'
import styles from './EmptyChat.module.css'

interface Props {
    activeChatHandler: (chatId: string) => void
}

const EmptyChat: FC<Props> = ({ activeChatHandler }) => {
    const [isCreateChat, setIsCreateChat] = useState<boolean>(false)

    const closeCreateChat = () => {
        setIsCreateChat(false)
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.createChatButton}
                type="button"
                onClick={() => setIsCreateChat(true)}
            >
                Створити чат
            </button>
            {isCreateChat && (
                <CreateChat
                    closeCreateChat={closeCreateChat}
                    activeChatHandler={activeChatHandler}
                />
            )}
        </div>
    )
}

export default EmptyChat
