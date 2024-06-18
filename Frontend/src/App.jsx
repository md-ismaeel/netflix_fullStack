import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from './Layout/Layout'
import { Home } from './Page/Home/Home'
import { Login } from './Page/Login/Login'
import { Movies } from './Page/Movie/Movies'
import { TvShoes } from './Page/Tv/TvShoes'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/layout',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: "movie",
          element: <Movies />
        },
        {
          path: "tv-show",
          element: <TvShoes />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
