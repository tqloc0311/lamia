import AxiosNetworkService, { INetworkService } from './axiosNetworkService';

const networkService: INetworkService = new AxiosNetworkService();

export const fetchData = async (endpoint: string) => {
  return networkService.get(endpoint);
};

export const postData = async (endpoint: string, data: any) => {
  return networkService.post(endpoint, data);
};
