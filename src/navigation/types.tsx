import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NativeStackNavigationBaseType =
  NativeStackNavigationProp<ParamListBase>;

export type BottomTabParams = {
  Home: NativeStackNavigationBaseType;
  ProductCategories: NativeStackNavigationBaseType;
  Search: NativeStackNavigationBaseType;
  Support: NativeStackNavigationBaseType;
  Profile: NativeStackNavigationProp<ProfileStackParams>;
};

export type CartStackParams = {
  Cart: NativeStackNavigationBaseType;
  CartDeliveryAddress: NativeStackNavigationBaseType;
  PlaceOrder: NativeStackNavigationBaseType;
};

export type ProfileStackParams = {
  ProfileInfo: NativeStackNavigationBaseType;
  Login: NativeStackNavigationBaseType;
  Register: NativeStackNavigationBaseType;
  PasswordResetting: NativeStackNavigationBaseType;
  OtpVerification: NativeStackNavigationBaseType;
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
};

export type AppNavigationType = NativeStackNavigationProp<
  AppStackParams | ParamListBase
>;

export type ProfileNavigationType = NativeStackNavigationProp<
  ProfileStackParams | ParamListBase
>;
