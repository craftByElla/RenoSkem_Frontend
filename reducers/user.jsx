
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfos: {},
    projectId: '',
};

// on retrouve dans le store redux le nom de l'utilisateur, son token, son avatar et ses skills
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    addUserInfosToStore: (state, action) => {
        state.userInfos = action.payload;
    },
    addProjectIdToStore: (state, action) => {
        state.projectId = action.payload
    },
},
});

export const { addUserInfosToStore } = userSlice.actions;
export default userSlice.reducer;