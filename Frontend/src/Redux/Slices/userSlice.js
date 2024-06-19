import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isLoading: false
}

const userSlice = createSlice({
    name: "netflixUsers",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setIsLoading, setUser } = userSlice.actions;
export default userSlice.reducer;