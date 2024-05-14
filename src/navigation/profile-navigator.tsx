import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { StackNavigationScreenOptions } from '../constants/Config';

import {
  ProfileScreen,
  LoginScreen,
  OTPVerificationScreen,
  PasswordResettingScreen,
  RegisterScreen,
} from '../screens';
import { useNavigation } from '@react-navigation/native';
import CButton from '../components/shared/custom-button';
import HeaderLogo from '../components/shared/header-logo';
import { ProfileNavigationType, ProfileStackParams } from './types';

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileNavigator = (): React.JSX.Element => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const renderCloseButton = (navigation: ProfileNavigationType) => {
    return (
      <CButton
        textColor="white"
        onPress={() => {
          navigation.pop();
        }}>
        Đóng
      </CButton>
    );
  };

  return (
    <Stack.Navigator screenOptions={StackNavigationScreenOptions}>
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitle: () => <HeaderLogo color="white" />,
          headerLeft: () => renderCloseButton(navigation),
        })}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="PasswordResetting"
          component={PasswordResettingScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OTPVerificationScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
