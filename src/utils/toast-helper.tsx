/* eslint-disable react-native/no-inline-styles */
import { AxiosError } from 'axios';
import React from 'react';
import Toast, {
  ToastType,
  ErrorToast,
  SuccessToast,
  InfoToast,
  ToastConfig,
} from 'react-native-toast-message';

const showToast = (
  title: string | undefined,
  message: string | undefined = undefined,
  type: ToastType | undefined = 'error',
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'bottom',
  });
};

const showError = (title: string, error: any) => {
  let message = '';
  let _title = title;
  if (error instanceof AxiosError) {
    message = error.response?.data?.message;
    const status = error.status ?? '-1';
    _title = `${title} (${status})`;
  } else {
    message = error.message;
  }

  Toast.show({
    type: 'error',
    text1: _title,
    text2: message,
    position: 'bottom',
  });
};

const getToastConfig = (): ToastConfig => {
  return {
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontFamily: 'Inter',
        }}
        text2Style={{
          fontFamily: 'Inter',
        }}
      />
    ),
    info: props => (
      <InfoToast
        {...props}
        text1Style={{
          fontFamily: 'Inter',
        }}
        text2Style={{
          fontFamily: 'Inter',
        }}
      />
    ),
    success: props => (
      <SuccessToast
        {...props}
        text1Style={{
          fontFamily: 'Inter',
        }}
        text2Style={{
          fontFamily: 'Inter',
        }}
      />
    ),
  };
};

const ToastHelper = { showToast, showError, getToastConfig };
export default ToastHelper;
