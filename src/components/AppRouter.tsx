import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../firefaseConfig'

const AppRouter: FC = () => {
    const [user] = useAuthState(auth)

    return user ? (
        <Routes>
            {privateRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
            ))}
            <Route path={'*'} element={<Navigate to={'/chat'} />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
            ))}
            <Route path={'*'} element={<Navigate to={'/login'} />} />
        </Routes>
    )
}

export default AppRouter
