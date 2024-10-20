import TokenManager from '@lamia/networking/tokenManager';
import API from '@lamia/networking/api';
import User from '@lamia/models/user';
import { setCurrentUser } from '@lamia/redux/slices/appSlice';
import { DispatchType } from './context';
import { setCities, setPaymentMethods } from '@lamia/redux/slices/globalSlice';
import { IPaymentMethod } from '@lamia/models/payment-method';
import { ICity } from '@lamia/models/address';
import { IFavorite } from '@lamia/models/favorite';
import { setFavorites } from '@lamia/redux/slices/favoriteSlice';

const fetchPaymentMethods = async (dispatch: DispatchType) => {
  const response = await API.orderAPI.fetchPaymentMethods();
  const data: IPaymentMethod[] = [];
  Object.keys(response.data).forEach(key => {
    const value = response.data[key];
    if (value) {
      data.push({
        id: key,
        name: value.name,
        des: value.des,
        default: value.default,
      });
    }
  });
  dispatch(setPaymentMethods(data));
};

const fetchCities = async (dispatch: DispatchType) => {
  const response = await API.userAPI.getCities();
  const data: ICity[] = response.data;
  dispatch(setCities(data));
};

export const fetchFavorite = async (dispatch: DispatchType) => {
  const response = await API.userAPI.getFavorite();
  const data: IFavorite[] = response.data;
  dispatch(setFavorites(data));
};

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

      await Promise.all([
        await fetchPaymentMethods(dispatch),
        await fetchCities(dispatch),
        await fetchFavorite(dispatch),
      ]);
    } else {
      dispatch(setCurrentUser(undefined));
    }
  } catch (error) {
    console.error('Error refreshing session:', error);
    dispatch(setCurrentUser(undefined));
  }
};

export default useRefreshSession;
