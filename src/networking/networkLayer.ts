import AxiosNetworkService, { INetworkService } from './axiosNetworkService';

const networkService: INetworkService = new AxiosNetworkService();

export const fetchData = async (endpoint: string, params: any = {}) => {
  return networkService.get(endpoint, params);
};

export const postData = async (endpoint: string, data: any) => {
  return networkService.post(endpoint, data);
};

export const putData = async (endpoint: string, data: any) => {
  return networkService.put(endpoint, data);
};
