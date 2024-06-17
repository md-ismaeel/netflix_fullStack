import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null
}

const MovieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setData: (state, actions) => {
            state.data = actions.payload
        }
    }
})

export const { setData } = MovieSlice.actions;
export const movieSlice = MovieSlice.reducer;  