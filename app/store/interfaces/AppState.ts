import { AuthState } from "../../interfaces/AuthInterfaces";
import { ProfileState } from "../../interfaces/ProfileInterfaces";


export interface AppState {
    auth : AuthState,
    toast : any,
    profile : ProfileState,
}