import { fetchData } from '../networkLayer';

export const getUserInfo = async () => {
  return fetchData('user_info');
};
