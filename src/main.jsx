import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CreateTrip from './trip/index.jsx'
import './index.css'
import Header from './components/custom/Header.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/trip-creation',
    element: <CreateTrip></CreateTrip>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_ID}>
      <Header></Header>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
