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
  get(url: string, params?: any): Promise<any>;
  post(url: string, data: any): Promise<any>;
  put(url: string, data: any): Promise<any>;
  delete(url: string, data: any): Promise<any>;
}

export default class AxiosNetworkService implements INetworkService {
  private async getHeaders(): Promise<{ Authorization?: string }> {
    const token = await TokenManager.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    params?: any,
  ): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const response = await instance.request({
        method,
        url,
        data,
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get(url: string, params: any = {}): Promise<any> {
    return this.request('get', url, undefined, params);
  }

  async post(url: string, data: any): Promise<any> {
    return this.request('post', url, data);
  }

  async put(url: string, data: any): Promise<any> {
    return this.request('put', url, data);
  }

  async delete(url: string, data: any): Promise<any> {
    return this.request('delete', url, data);
  }
}
