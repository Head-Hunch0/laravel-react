import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/error-page.jsx'
import Root from './routes/root.jsx'
import Users from './routes/users.jsx'
// import users from './routes/users.jsx'
import router from './router.jsx'
import { ContextProvider } from './Context/MainState.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
