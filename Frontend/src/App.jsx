import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from './Layout/Layout'
import { Home } from './Page/Home/Home'
import { Login } from './Page/Login/Login'
import { Movies } from './Page/Movie/Movies'
import { TvShows } from './Page/Tv/TvShows'
import { MovieDetails } from './Page/MovieDetails/MovieDetails'
import { WatchList } from './Page/WatchList/WatchList'
import { SearchResults } from './Page/SearchResults/SearchResults'



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
        },
        {
          path: 'watch-list',
          element: <WatchList />
        },
        {
          path: 'search',
          element: <SearchResults />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
