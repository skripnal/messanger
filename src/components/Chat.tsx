import { FC, useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'

import styles from './Chat.module.css'
import { auth, firestore } from '../firefaseConfig'
import {
    addDoc,
    collection,
    orderBy,
    query,
    serverTimestamp,
    where,
} from 'firebase/firestore'
import Loader from './Loader'
import { sendMessage } from '../utils/chatEvents'
import useFetchChatMessages from '../hooks/useFetchChatMessages'

interface Props {
    chatId: string
    backToEmtyChat: () => void
}

const Chat: FC<Props> = ({ chatId, backToEmtyChat }) => {
    const [inputValue, setInputValue] = useState<string>('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [user] = useAuthState(auth)
    const [messages, loading] = useFetchChatMessages(chatId)

    const sendMessageHandler = () => {
        if (!user) return
        if (inputValue === '') return
        sendMessage(chatId, user.uid, inputValue)
        setInputValue('')
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (loading) {
        return <Loader />
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatPanel}>
                <IoMdArrowRoundBack
                    className={styles.chatPanelBack}
                    onClick={backToEmtyChat}
                />
            </div>
            <div className={styles.messagesContainer}>
                {messages?.map((mes, index) =>
                    mes.senderId === user?.uid
                        ? mes.timestamp && (
                              <div key={index} className={styles.ownMessage}>
                                  <p>
                                      <span className={styles.timestamp}>
                                          {mes.timestamp
                                              .toDate()
                                              .toLocaleTimeString([], {
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                              })}
                                      </span>
                                      {mes.text}
                                  </p>
                              </div>
                          )
                        : mes.timestamp && (
                              <div key={index} className={styles.otherMessage}>
                                  <img src={mes.user.photoURL} />
                                  <p>{mes.user.username}</p>
                                  <p>
                                      {mes.text}
                                      <span className={styles.timestamp}>
                                          {mes.timestamp
                                              .toDate()
                                              .toLocaleTimeString([], {
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                              })}
                                      </span>
                                  </p>
                              </div>
                          )
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatInputForm}>
                <textarea
                    value={inputValue}
                    onChange={(el) => setInputValue(el.target.value)}
                />
                <button onClick={sendMessageHandler}>
                    <IoSend />
                </button>
            </div>
        </div>
    )
}

export default Chat
