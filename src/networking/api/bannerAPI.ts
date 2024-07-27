import { fetchData } from '../networkLayer';

export const fetchBanners = async () => {
  return fetchData('get_slider');
};
