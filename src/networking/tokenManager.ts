import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TokenManager {
  async saveToken(token: string) {
    try {
      await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
      throw error;
    }
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      return token;
    } catch (error) {
      throw error;
    }
  }
}
