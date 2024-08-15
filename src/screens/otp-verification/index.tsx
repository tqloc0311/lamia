import React, { useEffect, useState } from 'react';
// import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Spinner from 'react-native-loading-spinner-overlay';
import { resend, verifyOTP } from './actions';
import { AppNavigationType, AppStackParams } from '@lamia/navigation/types';
import Toast from 'react-native-toast-message';
import ToastHelper from '@lamia/utils/toast-helper';

type OTPVerificationScreenProps = RouteProp<AppStackParams, 'OTPVerification'>;

const OTPVerificationScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const route = useRoute<OTPVerificationScreenProps>();
  const {
    phoneNumber = '',
    password = '',
    otp: defaultOTP = '',
  } = route.params ?? {};

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const currentUser = useAppSelector(state => state.app.currentUser);
  const [otp, setOtp] = useState(defaultOTP);

  useEffect(() => {
    if (currentUser) {
      navigation.pop();
    }
  }, [currentUser, navigation]);

  const submit = () => {
    if (otp === '') {
      ToastHelper.showToast('Lỗi', 'Bạn chưa nhập mã xác thực.');
      return;
    }

    dispatch(verifyOTP({ phoneNumber, password, otp }));
  };

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <StatusBar barStyle="light-content" />
        {/* <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} /> */}
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4" mt="3">
            <Toast />
            <Spinner
              visible={isLoading}
              textContent={'Đang gửi...'}
              textStyle={styles.pinnerTextColor}
            />
            <Box backgroundColor="transparent">
              <Text mt="3" color="white" style={styles.title}>
                Nhập mã xác thực
              </Text>
              <Text color="white" style={styles.guide}>
                Vui lòng nhập mã xác thực đã được gửi tới số điện thoại của bạn
              </Text>
              <AuthTextInput
                style={styles.input}
                placeholder="Mã xác thực"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />
              <AuthButton
                px="12"
                py="3"
                mt="4"
                type="bordered"
                onPress={() => submit()}>
                Xác nhận
              </AuthButton>
              <AuthButton
                px="12"
                py="2"
                mt="5"
                type="bordered"
                onPress={() =>
                  dispatch(
                    resend({
                      phoneNumber,
                      completion: (newOTP: string) => {
                        setOtp(newOTP);
                      },
                    }),
                  )
                }>
                Gửi lại mã xác thực
              </AuthButton>
            </Box>
          </Box>
        </SafeAreaWrapper>
      </Box>
    </DismissKeyboardView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  pinnerTextColor: {
    color: 'white',
  },
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
  guide: {
    fontWeight: '400',
    marginBottom: 16,
  },
  input: {},
});
