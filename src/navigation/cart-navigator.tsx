import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { StackNavigationScreenOptions } from '../constants/Config';

import {
  CartScreen,
  CartDeliveryAddressScreen,
  PlaceOrderScreen,
} from '../screens';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import CIcon from '../components/shared/custom-icon';
import { Images } from '../utils/images';

const Stack = createNativeStackNavigator();

interface CartNavigatorProps {}

const CartNavigator = (props: CartNavigatorProps): React.JSX.Element => {
  // const navigation = useNavigation<NativeStackNavigationBaseType>();

  const renderBackButton = (
    navigation: NativeStackNavigationProp<ParamListBase>,
  ) => {
    return (
      <CIcon
        image={Images.arrowLeft}
        onPress={() => {
          navigation.pop();
        }}
      />
    );
  };
  return (
    <Stack.Navigator screenOptions={StackNavigationScreenOptions}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Mua hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
          headerShadowVisible: true,
        })}
      />
      <Stack.Screen
        name="CartDeliveryAddress"
        component={CartDeliveryAddressScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Mua hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
          headerShadowVisible: true,
        })}
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrderScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Mua hàng',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => renderBackButton(navigation),
          headerShadowVisible: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 16,
  },
});
