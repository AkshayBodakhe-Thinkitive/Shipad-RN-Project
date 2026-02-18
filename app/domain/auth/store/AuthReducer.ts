import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../../store/constants/StoreConstants';
import { AuthState } from '../../../interfaces/AuthInterfaces';
import { loginAction } from './async-actions/AuthAsyncActions';

const initialState: AuthState = {
  isLoggedIn: false,
  isOnboarded: false,
  loading: false,
  TenantID : '',
  loginData: null,
  accessToken: null,
  refreshToken: null,
  profileData: null,
};

const AuthReducer = createSlice({
  name: AUTH_REDUCER,
  initialState,
  reducers: {
    setIsOnboarded: (state: any, action: any) => {
      state.isOnboarded = action.payload;
    },
    resetAuthReducer : (state:any) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.loginData = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.profileData = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAction.pending, (state, action) => {
        state.loading = true;
      })
    .addCase(loginAction.fulfilled, (state, action) => {  
      state.loginData = action.payload?.loginData;
      state.profileData = action.payload?.profileData;
      state.accessToken = action.payload?.loginData?.accessToken;
      state.refreshToken = action.payload?.loginData?.refreshToken;
      state.isLoggedIn = true;
      state.loading = false;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
    })
  },
});


export default AuthReducer.reducer;
export const { setIsOnboarded, resetAuthReducer } = AuthReducer.actions;