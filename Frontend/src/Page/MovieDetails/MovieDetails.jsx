import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MovieCardDetails } from '../../Components/MovieCardDetails'
import { setMovieDetails, setCredits, setVideos, setRecommendations, setSimilarMovies } from '../../Redux/Slices/movieSlice'
import axios from 'axios'
import { Profile } from "../../Components/Profile"
import { useDispatch, useSelector } from 'react-redux'
import { MovieList } from '../../Components/MovieList'
import { OfficialVideos } from '../../Components/OfficialVideos'
import { getRequestOptions } from '../../utils/endPoints'

export const MovieDetails = () => {

    const { id } = useParams()
    const { pathname } = useLocation()
    const location = pathname.split('/')

    const { videos, similarMovies, recommendations } = useSelector((state) => state.movieSlice)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)


    const fetchMovieData = async () => {

        setIsLoading(true)
        const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}`, getRequestOptions)
        dispatch(setMovieDetails(response.data))
        setIsLoading(false)
    }


    const fetchCreditData = async () => {

        setIsLoading(true)
        const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/credits`, getRequestOptions)
        dispatch(setCredits(response.data));
        setIsLoading(false)
    }

    const FetchVideosData = async () => {
        setIsLoading(true)

        const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/videos`, getRequestOptions);
        dispatch(setVideos(response.data.results))
        // console.log(response.data.results);
    }

    const FetchSimilarMovies = async () => {

        const response = await axios.get(`https://api.themoviedb.org/3/${location[1]}/${id}/similar`, getRequestOptions)
        // console.log(response.data.results);
        dispatch(setSimilarMovies(response.data.results))
    }


    const FetchRecommendation = async () => {

        const response = await axios.get(`
    https://api.themoviedb.org/3/${location[1]}/${id}/recommendations`, getRequestOptions)
        // console.log(response.data.results);
        dispatch(setRecommendations(response.data.results))
    }



    useEffect(() => {
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
            <MovieList title={"Similar Movies"} movies={similarMovies} />
            <MovieList title={"Recommendations"} movies={recommendations} />
        </div>
    )
}