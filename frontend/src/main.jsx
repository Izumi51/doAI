import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
    createBrowserRouter, 
    RouterProvider 
} from 'react-router'

// Pages
import Home from './pages/Home.jsx'
import Donations from './pages/Donations.jsx'
import Login from './pages/Login.jsx' 
import Donate from './pages/Donate.jsx'
import About from './pages/About.jsx'

const root = document.getElementById('root')

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },

    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/donations",
        element: <Donations />
    },

    {
        path: "/donate",
        element: <Donate />
    },

    {
        path: "/about",
        element: <About />
    }
])

createRoot(root).render(
    <StrictMode>
        <RouterProvider router= { router } />
    </StrictMode>,
)