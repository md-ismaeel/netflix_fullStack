import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "../Components/Footer/Footer"
import { Navbar } from "../Components/Navbar/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Layout = () => {

    const { user } = useSelector((state) => state.userSlice);
    console.log(user);
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/')
    //     }
    // }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}