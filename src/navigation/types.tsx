import { IAddress } from '@lamia/models/address';
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
    address?: IAddress;
  };
  OrderManagement: NativeStackNavigationBaseType;
  Products: {
    categoryId: number;
  };
  ProductDetail: {
    productId: number;
  };
  ProductComments: {
    productId: number;
  };
  ProductCommentSubmit: {
    productId: number;
  };
  ProfileInfo: NativeStackNavigationBaseType;
  Login: NativeStackNavigationBaseType;
  Register: NativeStackNavigationBaseType;
  PasswordResetting: NativeStackNavigationBaseType;
  OTPVerification: {
    phoneNumber?: string;
    password?: string;
    otp?: string;
  };
  PaymentPolicy: NativeStackNavigationBaseType;
  Page: {
    path: string;
    title: string;
  };
};

export type AppNavigationType = NativeStackNavigationProp<
  AppStackParams | ParamListBase
>;
