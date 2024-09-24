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
