import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type PasswordResettingScreenProps = {};

const PasswordResettingScreen = (_: PasswordResettingScreenProps) => {
  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <StatusBar barStyle="light-content" />
        <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} />
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Box backgroundColor="transparent" mt="4">
              <Text mt="3" color="white" style={styles.title}>
                Bạn muốn tìm lại mật khẩu?
              </Text>
              <Text color="white" style={styles.guide}>
                Vui lòng nhập số điện thoại đã đăng ký, hệ thống sẽ giúp bạn
                thay đổi mật khẩu
              </Text>
              <AuthTextInput style={styles.input} placeholder="Số điện thoại" />
              <AuthButton px="12" py="4" mt="2" type="bordered">
                Gửi đi
              </AuthButton>
            </Box>
          </Box>
        </SafeAreaWrapper>
      </Box>
    </DismissKeyboardView>
  );
};

export default PasswordResettingScreen;

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
  guide: {
    fontWeight: '400',
    marginBottom: 16,
  },
  input: {},
});
