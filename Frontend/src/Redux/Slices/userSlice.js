import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isLoading: false,
    addToList: null
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
        },
        setAddToList: (state, actions) => {
            state.addToList = actions.payload;
        }
    }
})

export const { setIsLoading, setUser, setAddToList } = userSlice.actions;
export default userSlice.reducer;