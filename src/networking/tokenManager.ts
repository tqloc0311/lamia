import AsyncStorage from '@react-native-async-storage/async-storage';

class _TokenManager {
  private static instance: _TokenManager;

  private constructor() {
    // private constructor to prevent instantiation
  }

  static getInstance(): _TokenManager {
    if (!_TokenManager.instance) {
      _TokenManager.instance = new _TokenManager();
    }
    return _TokenManager.instance;
  }

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

const TokenManager = _TokenManager.getInstance();
export default TokenManager;
