import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../Slices/userSlice"
import movieSlice from "../Slices/movieSlice"

export const store = configureStore({
    reducer: {
        userSlice,
        movieSlice
    }
})