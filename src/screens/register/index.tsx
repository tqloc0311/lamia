import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type RegisterScreenProps = {};

const RegisterScreen = (_: RegisterScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <StatusBar barStyle="light-content" />
        <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} />
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Box backgroundColor="transparent" mt="4">
              <Text mt="3" color="white" style={styles.title}>
                Đăng ký tài khoản
              </Text>
              <AuthTextInput
                style={styles.input}
                placeholder="Số điện thoại (*)"
              />
              <AuthTextInput style={styles.input} placeholder="Mật khẩu (*)" />
              <AuthTextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu (*)"
              />
              <AuthTextInput style={styles.input} placeholder="Họ tên (*)" />
              <AuthButton
                px="12"
                py="4"
                mt="4"
                buttonStyle={styles.registerButton}
                type="bordered"
                onPress={() => {
                  navigation.replace('OTPVerification');
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
  registerButton: {
    alignSelf: 'flex-end',
  },
});
