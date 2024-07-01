import React, { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import { useAppDispatch, useAppSelector } from '../../hooks/context';
import { Box } from '@lamia/utils/theme';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import DismissKeyboardView from '../../components/shared/dismiss-keyboard-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthTextInput from '../../components/auth/auth-text-input';
import AuthButton from '../../components/auth/auth-button';
import { login } from './actions';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';

type LoginScreenProps = {};

const LoginScreen = (_: LoginScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const currentUser = useAppSelector(state => state.app.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.pop();
    }
  }, [currentUser, navigation]);

  useAndroidModalHandler();

  return (
    <DismissKeyboardView>
      <Box flex={1} bg="semiTransparentBlack">
        <Spinner
          visible={isLoading}
          textContent={'Đăng nhập...'}
          textStyle={{ color: 'white' }}
        />
        <StatusBar barStyle="light-content" />
        {/* <BlurView style={styles.absoluteFill} blurType="light" blurAmount={3} /> */}
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
