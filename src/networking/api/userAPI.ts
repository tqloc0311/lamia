import { IAddress } from '@lamia/models/address';
import { deleteData, fetchData, postData, putData } from '../networkLayer';

export const getUserInfo = async () => {
  return fetchData('user_info');
};

export const getCities = async () => {
  return fetchData('address/city');
};

export const getDistrict = async (cityId: string) => {
  return fetchData(`address/city/${cityId}`);
};

export const getAddress = async () => {
  return fetchData('address');
};

export const createAddress = async (
  phone: string,
  name: string,
  city: string,
  district: string,
  ward: string,
  address: string,
) => {
  const params = {
    phone,
    name,
    city,
    district,
    ward,
    address,
  };
  return postData('address', params);
};

export const updateAddress = async (address: IAddress) => {
  const params: Omit<IAddress, 'id'> = { ...address };
  return putData(`address/${address.id}`, params);
};

export const setDefaultAddress = async (id: number) => {
  return putData(`address/${id}`, { default_address: 1 });
};

export const deleteAddress = async (id: number) => {
  return deleteData(`address/${id}`, { default_address: 1 });
};

export const updateUser = async ({
  name,
  sex,
  email,
  birth_date,
  job,
}: {
  name: string;
  sex: string;
  email: string;
  birth_date: string;
  job: string;
}) => {
  const params = {
    name,
    sex,
    email,
    birth_date,
    job,
  };
  return postData('update_user', params);
};

export const deleteUser = async () => {
  return postData('user_delete', {});
};

export const addFavorite = async (product_id: number) => {
  return postData('product_likes', { product_id });
};

export const deleteFavorite = async (id: number) => {
  return deleteData(`product_likes/${id}`, {});
};

export const getFavorite = async () => {
  return fetchData('product_likes', {});
};
