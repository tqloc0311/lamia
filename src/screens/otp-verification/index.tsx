import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import styles from './styles';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type OTPVerificationScreenProps = {};

const OTPVerificationScreen = (props: OTPVerificationScreenProps) => {
  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
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
              <AuthButton px="12" py="3" mt="4" type="bordered">
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
