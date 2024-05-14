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
  NotificationsScreen,
  ProductDetailScreen,
  ProductsScreen,
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
import OrderManagementTabNavigator from './order-management-tab-navigator';

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = (): React.JSX.Element => {
  const renderBackButton = (navigation: AppNavigationType) => {
    return <CIcon image={Images.arrowLeft} onPress={() => navigation.pop()} />;
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
        component={OrderManagementTabNavigator}
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
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 16,
  },
});
