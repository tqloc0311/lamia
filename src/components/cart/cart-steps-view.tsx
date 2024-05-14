import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '../../utils/images';
import { combineStyles } from '../../utils/helpers';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps, useTheme } from '@shopify/restyle';

interface CartStepsViewProps extends BoxProps<Theme> {
  step: 0 | 1 | 2;
}

const CartStepsView = (props: CartStepsViewProps) => {
  return (
    <Box px="2" py="4" bg="gray9" {...props}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        mb="2"
        mx="4"
        alignItems="center">
        <CImage
          size={24}
          source={props.step == 0 ? Images.cartStep1 : Images.cartStep2}
        />
        <Box
          flex={1}
          height={2}
          mx="3"
          bg={props.step >= 1 ? 'primary' : 'gray6'}
        />
        <CImage
          size={24}
          source={
            props.step == 0
              ? Images.cartStep0
              : props.step == 1
              ? Images.cartStep1
              : Images.cartStep2
          }
        />
        <Box
          flex={1}
          height={2}
          mx="3"
          bg={props.step >= 2 ? 'primary' : 'gray6'}
        />
        <CImage
          size={24}
          source={props.step <= 1 ? Images.cartStep0 : Images.cartStep1}
        />
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Text>Giỏ hàng</Text>
        <Text>Chọn địa chỉ giao</Text>
        <Text>Thanh toán</Text>
      </Box>
    </Box>
  );
};

export default CartStepsView;
