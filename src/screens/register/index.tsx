import React, { useState } from 'react';
// import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { useNavigation } from '@react-navigation/native';

import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';
import { isValidPhoneNumber } from '@lamia/utils/helpers';
import ToastHelper from '@lamia/utils/toast-helper';
import { AppNavigationType } from '@lamia/navigation/types';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { register } from './actions';
import Spinner from 'react-native-loading-spinner-overlay';

type RegisterScreenProps = {};

const RegisterScreen = (_: RegisterScreenProps) => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const validate = () => {
    if (phoneNumber === '') {
      ToastHelper.showToast('Lỗi', 'Bạn chưa nhập số điện thoại.');
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      ToastHelper.showToast('Lỗi', 'Số điện thoại không đúng.');
      return false;
    }

    if (password === '') {
      ToastHelper.showToast('Lỗi', 'Bạn chưa nhập mật khẩu.');
      return false;
    }

    if (confirmPassword === '') {
      ToastHelper.showToast('Lỗi', 'Xác nhận lại mật khẩu.');
      return false;
    }

    if (confirmPassword !== password) {
      ToastHelper.showToast('Lỗi', 'Xác nhận lại mật khẩu không đúng.');
      return false;
    }

    if (name === '') {
      ToastHelper.showToast('Lỗi', 'Bạn chưa nhập họ tên.');
      return false;
    }

    return true;
  };

  const registerHandler = () => {
    if (validate()) {
      dispatch(register({ phoneNumber, password, name, navigation }));
    }
  };

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <StatusBar barStyle="light-content" />
        {/* <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} /> */}
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Toast />
            <Spinner
              visible={isLoading}
              textContent={'Đăng ký...'}
              textStyle={styles.spinnerText}
            />
            <Box backgroundColor="transparent" mt="4">
              <Text mt="3" color="white" style={styles.title}>
                Đăng ký tài khoản
              </Text>
              <AuthTextInput
                style={styles.input}
                placeholder="Số điện thoại (*)"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <AuthTextInput
                style={styles.input}
                placeholder="Mật khẩu (*)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType={'oneTimeCode'}
              />
              <AuthTextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu (*)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                textContentType={'oneTimeCode'}
              />
              <AuthTextInput
                style={styles.input}
                placeholder="Họ tên (*)"
                value={name}
                onChangeText={setName}
              />
              <AuthButton
                px="12"
                py="4"
                mt="4"
                alignSelf="flex-end"
                type="bordered"
                onPress={() => {
                  registerHandler();
                }}>
                Đăng ký
              </AuthButton>
            </Box>
          </Box>
        </SafeAreaWrapper>
      </Box>
    </DismissKeyboardView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {},
  spinnerText: {
    color: 'white',
  },
});
