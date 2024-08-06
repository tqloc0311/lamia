import React, { useEffect, useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../hooks/context';
import { Box } from '@lamia/utils/theme';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { login } from './actions';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';
import ToastHelper from '@lamia/utils/toast-helper';

type LoginScreenProps = {};

const LoginScreen = (_: LoginScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const currentUser = useAppSelector(state => state.app.currentUser);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('0708558773');
  // const [password, setPassword] = useState('nguyenvietduc.org');

  useEffect(() => {
    if (currentUser) {
      navigation.pop();
    }
  }, [currentUser, navigation]);

  useAndroidModalHandler();

  const loginHandler = () => {
    if (!phoneNumber) {
      ToastHelper.showToast(
        'Lỗi đăng nhập',
        'Bạn chưa nhập số điện thoại!',
        'error',
      );
      return;
    }

    if (!password) {
      ToastHelper.showToast(
        'Lỗi đăng nhập',
        'Bạn chưa nhập mật khẩu!',
        'error',
      );
      return;
    }

    dispatch(login({ phoneNumber, password }));
  };

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <StatusBar barStyle="light-content" />
        {/* <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} /> */}
        <SafeAreaWrapper>
          <Box flex={1} bg="transparent" p="4">
            <Spinner
              visible={isLoading}
              textContent={'Đăng nhập...'}
              textStyle={styles.spinnerText}
            />
            <Toast />
            <Box backgroundColor="transparent" mt="4">
              <AuthTextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <AuthTextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <AuthButton
                px="12"
                py="2"
                mt="4"
                buttonStyle={styles.loginButton}
                type="bordered"
                onPress={loginHandler}>
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

export const useAndroidModalHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    //Don't want to do anything on iOS
    if (Platform.OS !== 'android') {
      return;
    }

    const tabNavigator = getTabNavigatorProp(navigation.getParent());

    if (!tabNavigator) {
      return;
    }

    tabNavigator.setOptions({ headerShown: false });
    tabNavigator.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      //Unmounted callback
      tabNavigator.setOptions({ headerShown: true });

      tabNavigator.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);
};

const getTabNavigatorProp = (route: any): any => {
  if (!route) {
    return null;
  }
  if (route.getId() === 'BottomTab') {
    return route;
  }
  return getTabNavigatorProp(route.getParent());
};

const styles = StyleSheet.create({
  spinnerText: {
    color: 'white',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {},
  loginButton: {
    alignSelf: 'flex-end',
  },
  buttonRow: {
    justifyContent: 'space-between',
  },
});
