import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { auth } from './firefaseConfig'
import Loader from './components/Loader'

function App() {
    const [user, loading] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </div>
    )
}

export default App
