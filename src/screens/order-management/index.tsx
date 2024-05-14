import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';

const OrderManagementScreen = () => {
  const renderNoCart = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="50%" aspectRatio={1}>
          <CImage source={Images.noCart} resizeMode="contain" />
        </Box>

        <Text color="gray2" fontSize={12}>
          Hiện tại bạn không có đơn hàng nào!
        </Text>
      </Box>
    );
  };

  return (
    <Box bg="gray9" justifyContent="center" alignItems="center" flex={1}>
      {renderNoCart()}
    </Box>
  );
};

export default OrderManagementScreen;
