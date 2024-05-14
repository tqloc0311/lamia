import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import CIcon from '../shared/custom-icon';
import AmountPicker from '../product-detail/amount-picker';

interface CartItemProps extends BoxProps<Theme> {}

const CartItem = (props: CartItemProps) => {
  return (
    <Box
      {...props}
      px="3"
      py="4"
      borderBottomColor="gray9"
      borderBottomWidth={1}>
      <Box flexDirection="row">
        <CImage source={Images.test.girl1} size={75} />
        <Box width={12} />
        <Box flex={1}>
          <Box flexDirection="row">
            <Text fontSize={14} fontWeight="500">
              Đầm họa tiết tay cộc phối đai đính hoa LD260
            </Text>
            <Box width={12} />
            <CIcon image={Images.trash} size={20} />
          </Box>

          <Box my="1.5" flexDirection="row" alignItems="center">
            <Box
              width={12}
              height={12}
              borderRadius="rounded12"
              style={{ backgroundColor: 'blue' }}
              mr="1.5"
            />

            <Text fontSize={12} color="gray5">
              Xanh
            </Text>

            <Box width={1} height={10} bg="gray7" mx="1.5" />

            <Text fontSize={12} color="gray5">
              Size: S
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box>
              <Text fontWeight="700" lineHeight={22}>
                190.000đ
              </Text>
              <Box flexDirection="row">
                <Text
                  fontSize={12}
                  lineHeight={18}
                  color="gray5"
                  textDecorationStyle="solid"
                  textDecorationLine="line-through">
                  1.900.000đ
                </Text>
                <Text ml="1" fontSize={12} color="red">
                  -99%
                </Text>
              </Box>
            </Box>

            <AmountPicker onPick={amount => {}} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
