import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NativeStackNavigationBaseType =
  NativeStackNavigationProp<ParamListBase>;

export type BottomTabParams = {
  Home: NativeStackNavigationBaseType;
  ProductCategories: NativeStackNavigationBaseType;
  Search: NativeStackNavigationBaseType;
  Support: NativeStackNavigationBaseType;
  Profile: NativeStackNavigationBaseType;
};

export type CartStackParams = {
  Cart: NativeStackNavigationBaseType;
  CartDeliveryAddress: NativeStackNavigationBaseType;
  PlaceOrder: NativeStackNavigationBaseType;
};

export type AppStackParams = {
  Splash: NativeStackNavigationBaseType;
  BottomTab: NativeStackNavigationProp<BottomTabParams>;
  Cart: NativeStackNavigationProp<CartStackParams>;
  Contact: NativeStackNavigationBaseType;
  StoreSystem: NativeStackNavigationBaseType;
  UserInfo: NativeStackNavigationBaseType;
  ChangePassword: NativeStackNavigationBaseType;
  Notifications: NativeStackNavigationBaseType;
  Favorite: NativeStackNavigationBaseType;
  DeliveryAddress: NativeStackNavigationBaseType;
  EditDeliveryAddress: {
    address?: any;
  };
  OrderManagement: NativeStackNavigationBaseType;
  Products: NativeStackNavigationBaseType;
  ProductDetail: NativeStackNavigationBaseType;
  ProductComments: NativeStackNavigationBaseType;
  ProductCommentSubmit: NativeStackNavigationBaseType;
  ProfileInfo: NativeStackNavigationBaseType;
  Login: NativeStackNavigationBaseType;
  Register: NativeStackNavigationBaseType;
  PasswordResetting: NativeStackNavigationBaseType;
  OTPVerification: NativeStackNavigationBaseType;
};

export type AppNavigationType = NativeStackNavigationProp<
  AppStackParams | ParamListBase
>;
