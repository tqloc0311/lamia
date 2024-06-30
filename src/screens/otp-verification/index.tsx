import React, { useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Spinner from 'react-native-loading-spinner-overlay';
import { register } from './actions';

type OTPVerificationScreenProps = {};

const OTPVerificationScreen = (props: OTPVerificationScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const currentUser = useAppSelector(state => state.app.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.pop();
    }
  }, [currentUser, navigation]);

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <Spinner
          visible={isLoading}
          textContent={'Đăng ký...'}
          textStyle={styles.pinnerTextColor}
        />
        <StatusBar barStyle="light-content" />
        <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} />
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Box backgroundColor="transparent">
              <Text mt="3" color="white" style={styles.title}>
                Nhập mã xác thực
              </Text>
              <Text color="white" style={styles.guide}>
                Vui lòng nhập mã xác thực đã được gửi tới số điện thoại của bạn
              </Text>
              <AuthTextInput style={styles.input} placeholder="Mã xác thực" />
              <AuthButton
                px="12"
                py="3"
                mt="4"
                type="bordered"
                onPress={() => dispatch(register())}>
                Xác nhận
              </AuthButton>
              <AuthButton px="12" py="2" mt="5" type="bordered">
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
