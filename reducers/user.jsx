
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfos: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    addUserInfosToStore: (state, action) => {
        state.userInfos = action.payload;
    },
},
});

export const { addUserInfosToStore } = userSlice.actions;
export default userSlice.reducer;