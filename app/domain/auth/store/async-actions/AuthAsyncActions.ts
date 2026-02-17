import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/storeConfig";
import { AUTH_REDUCER } from "../../../../store/constants/StoreConstants";
import AuthService from "../services/AuthServices";
import { resetAuthReducer } from "../AuthReducer";
import { setAuthorization, setTenantId } from "../../../../config/AxiosConfig";

export const verifyEmailAction = createAsyncThunk<any, any, { state: RootState }>(
  AUTH_REDUCER + '/verify-email',
  async ({ email }, thunkApi) => {
    const response = await AuthService.verifyEmail(email);
    return response;
  },
);

export const loginAction = createAsyncThunk<any, any, { state: RootState }>(
  AUTH_REDUCER + '/login',
  async (data, thunkApi) => {
    const response = await AuthService.login(data);
    if(response?.status === 400){
      return response?.error?.response?.data
    }
    setAuthorization(response?.data?.accessToken)
   
    return { loginData: response?.data };
  },
);