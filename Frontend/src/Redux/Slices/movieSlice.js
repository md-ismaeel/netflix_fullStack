import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setData: (state, actions) => {
            state.data = actions.payload
        }
    }
})

export const { setData } = movieSlice.actions;
export default movieSlice.reducer;  