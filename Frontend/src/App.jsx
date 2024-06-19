import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from './Layout/Layout'
import { Home } from './Page/Home/Home'
import { Login } from './Page/Login/Login'
import { Movies } from './Page/Movie/Movies'
import { TvShows } from './Page/Tv/TvShows'
import { MovieDetails } from './Page/MovieDetails/MovieDetails'


function App() {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "movies",
          element: <Movies />
        },
        {
          path: "tv-shows",
          element: <TvShows />
        },
        {
          path: 'movie/:id',
          element: <MovieDetails />
        },
        {
          path: 'tv/:id',
          element: <MovieDetails />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
