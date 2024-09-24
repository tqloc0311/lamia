/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationScreenOptions } from '../constants/Config';

import {
  ChangePasswordScreen,
  ContactScreen,
  DeliveryAddressScreen,
  EditDeliveryAddressScreen,
  FavoriteScreen,
  LoginScreen,
  NotificationsScreen,
  OrderManagementScreen,
  OTPVerificationScreen,
  PasswordResettingScreen,
  ProductDetailScreen,
  ProductsScreen,
  ProfileScreen,
  RegisterScreen,
  SplashScreen,
  StoreSystemScreen,
  UserInfoScreen,
} from '../screens';
import CIcon from '../components/shared/custom-icon';
import { Images } from '../utils/images';
import CartNavigator from './cart-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { AppNavigationType, AppStackParams } from './types';
import CartButton from '@lamia/components/cart/cart-button';
import ProductCommentsScreen from '@lamia/screens/product-comments';
import ProductCommentSubmitScreen from '@lamia/screens/product-comment-submit';
import CButton from '@lamia/components/shared/custom-button';
import HeaderLogo from '@lamia/components/shared/header-logo';
import PaymentPolicyScreen from '@lamia/screens/payment-policy';

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = (): React.JSX.Element => {
  const renderBackButton = (navigation: AppNavigationType) => {
    return <CIcon image={Images.arrowLeft} onPress={() => navigation.pop()} />;
  };

  const renderCloseButton = (navigation: AppNavigationType) => {
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
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Liên hệ',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="StoreSystem"
        component={StoreSystemScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Hệ Thống Cửa Hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Thông Tin Cá Nhân',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Thay Đổi Mật Khẩu',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddressScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Địa Chỉ Nhận Hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
          headerShadowVisible: true,
        })}
      />
      <Stack.Screen
        name="EditDeliveryAddress"
        component={EditDeliveryAddressScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
          headerShadowVisible: true,
        })}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Sản Phẩm Yêu Thích',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Thông Báo Của Tôi',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="OrderManagement"
        component={OrderManagementScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Quản Lý Đơn Hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerLeft: () => renderBackButton(navigation),
          headerRight: () => <CartButton />,
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          title: '',
          headerShown: true,
          headerLeft: () => renderBackButton(navigation),
          headerRight: () => <CartButton />,
        })}
      />
      <Stack.Screen
        name="ProductComments"
        component={ProductCommentsScreen}
        options={({ navigation }) => ({
          title: 'Đánh giá',
          headerTitleStyle: styles.headerTitle,
          headerShown: true,
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="ProductCommentSubmit"
        component={ProductCommentSubmitScreen}
        options={({ navigation }) => ({
          title: 'Viết đánh giá',
          headerTitleStyle: styles.headerTitle,
          headerShown: true,
          headerLeft: () => renderBackButton(navigation),
        })}
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
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="PasswordResetting"
          component={PasswordResettingScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ProfileInfo"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentPolicy"
          component={PaymentPolicyScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Chính sách thanh toán',
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => renderBackButton(navigation),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
  },
});
