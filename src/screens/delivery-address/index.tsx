import React from 'react';
import { Box } from '@lamia/utils/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeliveryAddressList from '@lamia/components/delivery-address/delivery-address-list';

interface DeliveryAddressProps {}

const DeliveryAddressScreen = (props: DeliveryAddressProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Box flex={1} backgroundColor="white">
      <DeliveryAddressList />
    </Box>
  );
};

export default DeliveryAddressScreen;
