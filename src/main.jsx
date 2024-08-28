import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CreateTrip from './trip/index.jsx'
import './index.css'
import Header from './components/custom/Header.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

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
    <Header></Header>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
