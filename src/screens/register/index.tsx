import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { Box, Text } from '@lamia/utils/theme';
import { StatusBar } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import styles from './styles';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type RegisterScreenProps = {};

const RegisterScreen = (props: RegisterScreenProps) => {
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
