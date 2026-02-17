import { post } from "../../../../config/AxiosConfig";

class AuthService{

    async verifyEmail(email: any) {
    try {
      const response: any = await post(`users/verify-email/${email}`,{},{headers: {Authorization: undefined}});
      return response;
    } catch (error: any) {
      return { error: error, status: error?.status };
    }
  }

  async login(data: any) {
  try {
    const response: any = await post('/login', data,{headers: {Authorization: undefined,"X-TENANT-ID":"dev_aj"}});
    return response;
  } catch (error: any) {
    return { error, status: error?.response?.status };
  }
}

}

export default new AuthService();