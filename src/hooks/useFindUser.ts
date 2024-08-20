import { useState, useEffect } from 'react'
import {
    DocumentData,
    collection,
    endAt,
    getDocs,
    limit,
    orderBy,
    query,
    startAt,
} from 'firebase/firestore'
import { firestore } from '../firefaseConfig'

const useFindUser = (inputValue: string): DocumentData[] => {
    const [users, setUsers] = useState<DocumentData[]>([])

    useEffect(() => {
        if (inputValue.trim() === '') {
            setUsers([])
            return
        }

        const fetchUsers = async () => {
            const usersRef = collection(firestore, 'users')

            const q = query(
                usersRef,
                orderBy('username'),
                startAt(inputValue),
                endAt(inputValue + '\uf8ff'),
                limit(5)
            )

            const querySnapshot = await getDocs(q)
            const usersData = querySnapshot.docs.map((doc) => doc.data())
            setUsers(usersData)
        }

        if (inputValue) {
            fetchUsers()
        }
    }, [inputValue])

    return users
}

export default useFindUser
