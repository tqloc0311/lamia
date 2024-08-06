import TokenManager from '@lamia/networking/tokenManager';
import API from '@lamia/networking/api';
import User from '@lamia/models/user';
import { setCurrentUser } from '@lamia/redux/slices/appSlice';
import { DispatchType } from './context';

const useRefreshSession = async (dispatch: DispatchType) => {
  try {
    const token = await TokenManager.getToken();
    if (token) {
      const refreshTokenResponse = await API.authAPI.refreshToken(token);
      const newToken = refreshTokenResponse.token;
      TokenManager.saveToken(newToken);
      const userResponse = await API.userAPI.getUserInfo();
      const user = new User(userResponse.data);
      dispatch(setCurrentUser(user));
    } else {
      dispatch(setCurrentUser(undefined));
    }
  } catch (error) {
    console.error('Error refreshing session:', error);
    dispatch(setCurrentUser(undefined));
  }
};

export default useRefreshSession;
