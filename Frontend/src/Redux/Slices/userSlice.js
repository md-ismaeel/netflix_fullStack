import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    loading: false
}

const userSlice = createSlice({
    name: "netflixUsers",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;