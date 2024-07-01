import React from 'react';
import { Box } from '@lamia/utils/theme';
import CartStepsView from '../../components/cart/cart-steps-view';
import CartBottomButton from '../../components/cart/cart-bottom-button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeliveryAddressList from '@lamia/components/delivery-address/delivery-address-list';

interface CartDeliveryAddressProps {}

const CartDeliveryAddressScreen = (_: CartDeliveryAddressProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Box flex={1} backgroundColor="white">
      <CartStepsView step={1} />
      <DeliveryAddressList />
      <Box
        bg="white"
        shadowColor="black"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={3}>
        <CartBottomButton
          buttonTitle="Tiếp theo"
          onPress={() => navigation.navigate('PlaceOrder')}
        />
      </Box>
    </Box>
  );
};

export default CartDeliveryAddressScreen;
