import axios, { AxiosInstance } from 'axios';
import CONST from './const';
import { checkAndRefreshToken } from '@/utils/units';


export const AxiosClient = axios.create({
     baseURL: CONST.REQUEST.API_ADDRESS,
     timeout: CONST.REQUEST.REQUEST_TIMEOUT,
     headers: {
          'Content-Type': 'application/json',
     },
     withCredentials: true,
});

let isTokenRefreshingFailed = false;

const registerInterceptorsRequest = (clientInstance: AxiosInstance) => {
     clientInstance.interceptors.request.use(
          async (config) => {
               if (config.url === 'customer-auth/refresh') {
                    return config;
               }
               if (isTokenRefreshingFailed) {
                    console.warn('Refresh token đã thất bại trước đó, không thử lại.');
                    return config;
               }
               try {
                    await checkAndRefreshToken();
               } catch (error) {
                    console.error('Lỗi trong quá trình refresh token:', error);
                    isTokenRefreshingFailed = true;
                    return Promise.reject(error);
               }

               return config;
          },
          (error: any) => {},
     );
};

registerInterceptorsRequest(AxiosClient);

// const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
//   clientInstance.interceptors.response.use(
//     (response: any) => {
//       const res = response?.data || response;
//       return res;
//     },
//     async function (error: any) {
//       return Promise.reject(error);
//     }
//   );
// };
const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
     clientInstance.interceptors.response.use(
          (response: any) => {
               const res = response?.data || response;
               return res;
          },
          (error: any) => Promise.reject(error),
     );
};
registerInterceptorResponse(AxiosClient);

const setConfigAxiosClient = (accessToken: any, clientAxiosInstance: AxiosInstance) => {
     clientAxiosInstance.defaults.headers.common = {
          'Content-Type': 'application/json',
     };
     clientAxiosInstance.defaults.timeout = CONST.REQUEST.REQUEST_TIMEOUT;
     if (accessToken) {
          clientAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
     }
};

export function setConfigAxios(accessToken: any) {
     setConfigAxiosClient(accessToken, AxiosClient);
}

const post = (url: string, data?: any, config = {}) => {
     return AxiosClient.post(url, data, config);
};

const get = (url: string, config = {}) => {
     return AxiosClient.get(url, config);
};

const put = (url: string, data?: any, config = {}) => {
     return AxiosClient.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
     return AxiosClient.patch(url, data, config);
};

const del = (url: string, config = {}) => {
     return AxiosClient.delete(url, config);
};
const MSTFetch = {
     post,
     get,
     put,
     patch,
     delete: del,
};

export default MSTFetch;
