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
import ProductDetails from './components/Product/ProductDetails.jsx'
import ProductsProvider from './products/ProductsProvider.jsx'
import User from './pages/User.jsx'
import OtpDemo from './pages/OtpDemo.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

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
        path: "/forgot-password",
        element: (<> <ScrollRestoration /> <ForgotPassword /> </>)
    },

    {
        path: "/donations",
        element: (<> <ScrollRestoration /> <Donations /> </>)
    },

    {
        path: "/donate",
        element: (<> <ScrollRestoration /> <Donate /> </>)
    }, 

    {
        path: "/products/:id",
        element: (<> <ScrollRestoration /><ProductDetails /> </>)
    },

    {
        path: "/profile",
        element: (<> <ScrollRestoration /><User /> </>)
    },
    
    {
        path: "/demo",
        element: (<> <ScrollRestoration /><OtpDemo /> </>)
    },

    { /* Not Found */
        path: "*", 
        element: (<> <ScrollRestoration /> <NotFound /> </>)
    }
])

createRoot(root).render(
    <StrictMode>
        <AuthProvider>
            <ProductsProvider>
                <RouterProvider router={ router } />
            </ProductsProvider>
        </AuthProvider>
    </StrictMode>
)