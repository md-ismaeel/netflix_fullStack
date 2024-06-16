import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from './Layout/Layout'
import { Home } from './Page/Home/Home'
import { Cont } from './Page/cont/Cont'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: "count",
          element: <Cont />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
