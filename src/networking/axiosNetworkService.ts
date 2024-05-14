import axios from 'axios';
import { BASE_URL } from './apiConfig';
import TokenManager from './tokenManager';

const tokenManager = new TokenManager();

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class INetworkService {
  async get(url: string): Promise<any> {}
  async post(url: string, data: any): Promise<any> {}
}

export default class AxiosNetworkService extends INetworkService {
  async get(url: string): Promise<any> {
    try {
      const token = await tokenManager.getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await instance.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const token = await tokenManager.getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await instance.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
