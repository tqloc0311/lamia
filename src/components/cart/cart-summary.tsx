import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import { moneyFormat } from '@lamia/utils/helpers';

interface CartSummaryProps extends BoxProps<Theme> {
  total: number;
  discount: number;
}

const CartSummary = (props: CartSummaryProps) => {
  return (
    <Box px="3" py="2" borderBottomColor="gray8" borderBottomWidth={1}>
      <Box flexDirection="row" justifyContent="space-between">
        <Text color="gray4" fontWeight="400" fontSize={14}>
          Tổng tiền hàng
        </Text>
        <Text color="gray4" fontWeight="400" fontSize={14}>
          {moneyFormat(props.total) + 'đ'}
        </Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between" my="2">
        <Text color="gray4" fontWeight="400" fontSize={14}>
          Mã giảm giá
        </Text>
        <Text color="gray4" fontWeight="400" fontSize={14}>
          {moneyFormat(props.discount) + 'đ'}
        </Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text fontSize={14}>Tạm tính</Text>
        <Text fontSize={14}>
          {moneyFormat(props.total - props.discount) + 'đ'}
        </Text>
      </Box>
    </Box>
  );
};

export default CartSummary;
