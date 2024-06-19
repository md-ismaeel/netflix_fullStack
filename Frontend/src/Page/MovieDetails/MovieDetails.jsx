import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MovieCardDetails } from '../../Components/MovieCardDetails'
import { setMovieDetails, setCredits, setVideos, setRecommendations, setSimilarMovies } from '../../Redux/Slices/movieSlice'
import axios from 'axios'
import { Profile } from "../../Components/Profile"
import { useDispatch, useSelector } from 'react-redux'
import { MovieList } from '../../Components/MovieList'
import { OfficialVideos } from '../../Components/OfficialVideos'

export const MovieDetails = () => {

  const { id } = useParams()
  const { pathname } = useLocation()
  const location = pathname.split('/')

  const { videos, similarMovies, recommendations } = useSelector((state) => state.movieSlice)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)


  const fetchMovieData = async () => {

    setIsLoading(true)
    const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
        },
      })
    dispatch(setMovieDetails(response.data))
    setIsLoading(false)
  }


  const fetchCreditData = async () => {

    setIsLoading(true)
    const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/credits`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
        },
      })
    dispatch(setCredits(response.data));
    setIsLoading(false)
  }

  const FetchVideosData = async () => {
    setIsLoading(true)

    const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/videos`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
        },
      }
    );
    dispatch(setVideos(response.data.results))
    // console.log(response.data.results);
  }

  const FetchSimilarMovies = async () => {

    const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/similar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
      },
    })
    // console.log(response.data.results);
    dispatch(setSimilarMovies(response.data.results))
  }


  const FetchRecommendation = async () => {

    const response = await axios.get(`
    https://api.themoviedb.org/3/${location[1]}/${id}/recommendations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
      },
    })
    console.log(response.data.results);
    dispatch(setRecommendations(response.data.results))
  }



  useEffect(() => {
    console.log('newMovies', location[1]);
    fetchMovieData()
    fetchCreditData()
    FetchVideosData()
    FetchSimilarMovies()
    FetchRecommendation()

    return () => {
      dispatch(setMovieDetails({}))
      dispatch(setCredits([]))
      dispatch(setVideos([]))
      dispatch(setSimilarMovies([]))
      dispatch(setRecommendations([]))

    }
  }, [id])

  return (

    <div className='text-white w-full flex flex-col'>
      <MovieCardDetails />
      <Profile />
      <OfficialVideos />
      <MovieList title={"SimilarMovies"} movies={similarMovies} />
      <MovieList title={"Recommendations"} movies={recommendations} />
      {/* <SimilarMoviesData /> */}
      {/* <Recommendation />  */}
    </div>
  )
}
