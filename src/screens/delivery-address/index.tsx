import React from 'react';
import { Box } from '@lamia/utils/theme';
import DeliveryAddressList from '@lamia/components/delivery-address/delivery-address-list';

interface DeliveryAddressProps {}

const DeliveryAddressScreen = (_: DeliveryAddressProps) => {
  return (
    <Box flex={1} backgroundColor="white">
      <DeliveryAddressList />
    </Box>
  );
};

export default DeliveryAddressScreen;
