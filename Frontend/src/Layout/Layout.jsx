import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "../Components/Footer/Footer"
import { Navbar } from "../Components/Navbar/Navbar"
import { useSelector } from "react-redux"
import { usePlayingNow } from "../Hooks/usePlayingNow"
import { usePopularMovies } from "../Hooks/usePopularMovies"
import { useTopRatedMovies } from "../Hooks/useTopRatedMovies"
import { useUpcomingMovies } from "../Hooks/useUpcomingMovies"
import { useTrendingMovies } from "../Hooks/useTrendingMovies"
import { useGenres } from "../Hooks/useGenres"
import { useEffect } from "react"


export const Layout = () => {

    const { user } = useSelector((state) => state.userSlice);
    // console.log(user);
    const navigate = useNavigate()

    usePlayingNow();
    usePopularMovies();
    useTopRatedMovies()
    useUpcomingMovies()
    useTrendingMovies()
    useGenres();

    // useVideos()

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }
    // }, [user])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}