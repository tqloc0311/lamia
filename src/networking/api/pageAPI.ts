import { fetchData } from '../networkLayer';

export const fetchPaymentPolicy = async () => {
  return fetchData('page/chinh-sach-thanh-toan');
};

export const fetchPage = async (path: string) => {
  return fetchData(path);
};
