import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firefaseConfig'
import { User } from '../interfaces'

const useFetchUserById = (userId: string | null | undefined) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (!userId) return

        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(firestore, 'users', userId))
                if (userDoc.exists()) {
                    setUser(userDoc.data() as User)
                }
            } catch (error) {
                console.log('Error useFethUserById:', error)
            }
        }
        fetchUser()
    }, [userId])

    return user
}

export default useFetchUserById
