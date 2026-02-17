import { combineReducers, Reducer } from '@reduxjs/toolkit';
import authReducer from '../domain/auth/store/AuthReducer';
import { AppState } from './interfaces/AppState';
import ToastReducer from './common-reducer/ToastReducer';
import ProfileReducers from '../domain/profile/store/ProfileReducers'

export const rootReducer : Reducer<AppState> = combineReducers({
    auth : authReducer,
    toast : ToastReducer,
    profile : ProfileReducers,
})