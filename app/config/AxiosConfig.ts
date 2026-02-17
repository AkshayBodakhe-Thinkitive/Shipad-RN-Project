import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';


export let BASE_URL_DEV = 'https://em-be.dev.api.eu.eamata.com/api/master'

const instance : AxiosInstance = axios.create({
    baseURL:BASE_URL_DEV,
    headers:{
        'Content-Type':'application/json',
        "X-TENANT-ID" : "dev_aj"
    }
})


export const setTenantId = (tenantId: string) => {
  instance.defaults.headers['X-TENANT-ID'] = tenantId;
};

export const setAuthorization = (token: string) => {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const setAcceptLanguage = (language: string) => {
  instance.defaults.headers['Accept-Language'] = language;
};

const get = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.get(url, config).then(({data}) => data);

const post = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> =>
  instance.post(url, data, config).then((res: any) => {
    return res?.data;
  });

const put = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> => instance.put(url, data, config);

const _delete = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.delete(url, config).then(({data}) => data);

const patch = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> => instance.patch(url, data, config).then(({data}) => data);

export {get, put, post, _delete, patch, instance};