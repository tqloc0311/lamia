import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { AttributeDetail } from '@lamia/models/product-attribute';
import {
  setAttributeDetail,
  setIsFetchingAttributeDetail,
} from '@lamia/redux/slices/productSlice';

export const fetchAttributeDetail = createAsyncThunk(
  'fetch_attribute-detail',
  async (
    args: {
      productId: number;
      attributeId: number;
      callback?: (data: AttributeDetail | undefined) => void;
    },
    { dispatch },
  ) => {
    const { productId, attributeId, callback } = args;
    dispatch(setIsFetchingAttributeDetail(true));
    try {
      const response = await API.productAPI.fetchAttributeDetail(
        productId,
        attributeId,
      );
      const data: AttributeDetail = response.data;
      dispatch(
        setAttributeDetail({ productId, attributeId, attributeDetail: data }),
      );
      callback?.(data);
    } catch (error: any) {
      callback?.(undefined);
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setIsFetchingAttributeDetail(false));
    }
  },
);
