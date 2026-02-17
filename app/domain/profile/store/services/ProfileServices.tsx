import { get, post, put, _delete } from "../../../../config/AxiosConfig";

class ProfileService {
    async getProfile() {
        const response: any = await get(`/patient/profile`);
        return response;
    }

      async updateProfile(payload: any) {
            const response: any = await put(`/patient`, payload);
            return response;
    }
}

export default new ProfileService();