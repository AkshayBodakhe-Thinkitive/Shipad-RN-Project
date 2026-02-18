import { Profile } from "./ProfileInterfaces";


export interface AuthState {
    isLoggedIn : boolean,
    isOnboarded : boolean,
    loading : boolean,
    TenantID : string,
    loginData : any,
    accessToken : string | null,
    refreshToken : string | null,
    profileData : Profile | null,
}