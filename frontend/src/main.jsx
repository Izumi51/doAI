import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './auth/AuthProvider.jsx'
import { 
    createBrowserRouter, 
    RouterProvider,
    ScrollRestoration 
} from 'react-router'

// Pages
import Home from './pages/Home.jsx'
import Donations from './pages/Donations.jsx'
import Login from './pages/Login.jsx' 
import Donate from './pages/Donate.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'
import Don from '../tetse/Don.jsx'

const root = document.getElementById('root')

const router = createBrowserRouter([
    {
        path: "/",
        element: (<> <ScrollRestoration /> <Home /> </>)
    },

    {
        path: "/login",
        element: (<> <ScrollRestoration /> <Login /> </>)
    },

    {
        path:"/register",
        element: (<> <ScrollRestoration /> <Register /> </>)
    },

    {
        path: "/donations",
        element: (<> <ScrollRestoration /> <Donations /> </>)
    },

    {
        path: "/donate",
        element: (<> <ScrollRestoration /> <Donate /> </>)
    }, 
    { /* Not Found */
        path: "*", 
        element: (<> <ScrollRestoration /> <NotFound /> </>)
    }
])

createRoot(root).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={ router } />
        </AuthProvider>
    </StrictMode>
)
