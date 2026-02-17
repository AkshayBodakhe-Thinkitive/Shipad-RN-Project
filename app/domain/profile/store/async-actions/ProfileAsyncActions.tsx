import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_REDUCER } from '../../../../store/constants/StoreConstants';
import { RootState } from '../../../../store/storeConfig';
import ProfileService from '../services/ProfileServices';

export const getProfileAction = createAsyncThunk<any, void, { state: RootState }>(
  PROFILE_REDUCER + '/get-profile', async (_, { rejectWithValue }) => {
  try {
    const response = await ProfileService.getProfile();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const updateProfileAction = createAsyncThunk<any, any, { state: RootState }>(
    PROFILE_REDUCER + '/update-profile',
    async (payload, thunkApi) => {
      const response = await ProfileService.updateProfile(payload);
      return response;
    },
  );
