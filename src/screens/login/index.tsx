import React, { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import Spinner from 'react-native-loading-spinner-overlay';

import { useAppDispatch, useAppSelector } from '../../hooks/context';
import styles from './styles';
import { Box } from '@lamia/utils/theme';
import { StatusBar } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { login } from './actions';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type LoginScreenProps = {};

const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const currentUser = useAppSelector(state => state.app.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.pop();
    }
  }, [currentUser]);

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <Spinner
          visible={isLoading}
          textContent={'Đăng nhập...'}
          textStyle={{ color: 'white' }}
        />
        <StatusBar barStyle="light-content" />
        <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} />
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Box backgroundColor="transparent" mt="4">
              <AuthTextInput style={styles.input} placeholder="Số điện thoại" />
              <AuthTextInput style={styles.input} placeholder="Mật khẩu" />
              <AuthButton
                px="12"
                py="2"
                mt="4"
                buttonStyle={styles.loginButton}
                type="bordered"
                onPress={() => dispatch(login())}>
                Đăng nhập
              </AuthButton>
              <Box
                mt="4"
                flexDirection="row"
                bg="transparent"
                style={styles.buttonRow}>
                <AuthButton
                  onPress={() => {
                    navigation.replace('PasswordResetting');
                  }}>
                  Quên mật khẩu?
                </AuthButton>
                <AuthButton
                  onPress={() => {
                    navigation.replace('Register');
                  }}>
                  Đăng ký tài khoản
                </AuthButton>
              </Box>
            </Box>
          </Box>
        </SafeAreaWrapper>
      </Box>
    </DismissKeyboardView>
  );
};

export default LoginScreen;
