import {Navigate, Routes, createBrowserRouter} from 'react-router-dom'
import Login from './routes/login';
import Signup from './routes/signup';
import Users from './routes/users';
import ErrorPage from './routes/error-page';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import UserForm from './routes/UserForm';


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard'/>
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/users/new',
            element: <UserForm key="userCreate"/>
        },
        {
            path: '/users/:id',
            element: <UserForm  key="userUpdate"/>
        },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/signup',
            element: <Signup />
        },
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
        }
        
    ]
)

export default router;

