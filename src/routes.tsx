import ChatPage from './components/ChatPage'
import Login from './components/Login'
import Settings from './components/Settings'
import { ROUTES } from './utils/enums'

export const publicRoutes = [
    {
        path: ROUTES.LOGIN_ROUTE,
        element: <Login />,
    },
]

export const privateRoutes = [
    {
        path: ROUTES.CHAT_ROUTE,
        element: <ChatPage />,
    },
    {
        path: ROUTES.SETTINGS_ROUTE,
        element: <Settings />,
    },
]
