import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage'
import App from './App'

const Homepage = lazy(() => import('./pages/Homepage/Homepage'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Favorites = lazy(() => import('./pages/Profile/Favorites/Favorites'))
const Login = lazy(() => import('./pages/Forms/Login/Login'))
const Register = lazy(() => import('./pages/Forms/Register/Register'))
const SerieDetails = lazy(() => import('./pages/SerieDetails/SerieDetails'))
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel'))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />, 
        children: [
            {
                path: "/", 
                element: <Homepage />,
            },
            {
                path: "/profile",
                element: <Profile />,

            },
            {
                path: "favorites",
                element: <Favorites />
            },
            {
                path: "/login",
                element: <Login />,
        
            },
            {
                path: "/register",
                element: <Register />,
        
            },
            {
                path: "/seriedetails",
                element: <SerieDetails />,
        
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
        
            },
        ]
    }
]);