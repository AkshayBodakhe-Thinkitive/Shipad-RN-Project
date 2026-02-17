

import { createSlice } from '@reduxjs/toolkit';
import { PROFILE_REDUCER } from '../../../store/constants/StoreConstants';
import { Profile, ProfileState } from '../../../interfaces/ProfileInterfaces';
import { getProfileAction } from './async-actions/ProfileAsyncActions'

const initialState: ProfileState = {
 profileData: {} as Profile,
 loading: false,
 patientByIdData: null
};

const ProfileReducers = createSlice({
  name: PROFILE_REDUCER,
  initialState,
  reducers: {
  },  
  extraReducers: builder => {
    builder
      .addCase(getProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.profileData = action.payload?.data;
        console.log(state.profileData);
        state.loading = false;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
      })
    }
})


export default ProfileReducers.reducer;
export const {  } = ProfileReducers.actions;