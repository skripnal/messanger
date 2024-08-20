import { Timestamp } from 'firebase/firestore'

export interface User {
    createdAt: Timestamp
    photoURL: string
    uid: string
    username: string
}
