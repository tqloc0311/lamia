import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setCityLoading, setDistrictLoading, setLoading } from './store';
import { IAddress, ICity, IDistrict } from '@lamia/models/address';
import { RootState } from '@lamia/redux/store';
import { setCities, setDistricts } from '@lamia/redux/slices/globalSlice';
import { setAddresses } from '@lamia/redux/slices/addressSlice';

export const editDeliveryAddress = createAsyncThunk(
  'edit-delivery-address',
  async (
    args: { address: IAddress; callback: () => void },
    { dispatch, getState },
  ) => {
    const { address, callback } = args;
    try {
      dispatch(setLoading(true));
      const response = await API.userAPI.updateAddress(address);
      const updatedAddress: IAddress = response.data;
      const state: RootState = getState() as any;
      const addresses = state.addresses.addresses;
      const updatedAddresses = addresses.map(item =>
        item.id === updatedAddress.id ? { ...updatedAddress } : item,
      );
      dispatch(setAddresses(updatedAddresses));
      callback();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const addDeliveryAddress = createAsyncThunk(
  'add-delivery-address',
  async (
    args: { address: Omit<IAddress, 'id'>; callback: () => void },
    { dispatch, getState },
  ) => {
    const { address, callback } = args;
    try {
      dispatch(setLoading(true));
      const response = await API.userAPI.createAddress(
        address.phone,
        address.name,
        address.city,
        address.district,
        address.ward,
        address.address,
      );
      const createdAddress: IAddress = response.data;
      const state: RootState = getState() as any;
      const addresses = state.addresses.addresses;
      dispatch(setAddresses([...addresses, createdAddress]));
      callback();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const setDeliveryAddressDefault = createAsyncThunk(
  'set-delivery-address-default',
  async (
    args: { addressId: number; callback: () => void },
    { dispatch, getState },
  ) => {
    const { addressId, callback } = args;
    try {
      dispatch(setLoading(true));
      await API.userAPI.setDefaultAddress(addressId);
      const state: RootState = getState() as any;
      const addresses = state.addresses.addresses;
      const updatedAddresses = addresses.map(item =>
        item.id === addressId
          ? { ...item, default_address: 1 }
          : { ...item, default_address: 0 },
      );
      dispatch(setAddresses(updatedAddresses));
      callback();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const fetchCities = createAsyncThunk(
  'fetch-cities',
  async (_, { dispatch }) => {
    try {
      dispatch(setCityLoading(true));
      const response = await API.userAPI.getCities();
      const cities: ICity[] = response.data;
      dispatch(setCities(cities));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setCityLoading(false));
    }
  },
);

export const fetchDistricts = createAsyncThunk(
  'fetch-districts',
  async (cityId: string, { dispatch }) => {
    try {
      dispatch(setDistrictLoading(true));
      const response = await API.userAPI.getDistrict(cityId);
      const districts: IDistrict[] = response.data;
      dispatch(setDistricts(districts));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setDistrictLoading(false));
    }
  },
);
