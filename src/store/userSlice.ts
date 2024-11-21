import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: [],
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserData(state: { userData: string[] }, action: { payload: string[]; }) {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;