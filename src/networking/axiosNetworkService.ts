import axios from 'axios';
import { BASE_URL } from './apiConfig';
import TokenManager from './tokenManager';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface INetworkService {
  get(url: string, params: any): Promise<any>;
  post(url: string, data: any): Promise<any>;
}

export default class AxiosNetworkService implements INetworkService {
  async get(url: string, params: any = {}): Promise<any> {
    try {
      const token = await TokenManager.getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await instance.get(url, { headers, params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const token = await TokenManager.getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await instance.post(url, data, { headers });
      console.log('🚀 ~ AxiosNetworkService ~ post ~ response:', response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
