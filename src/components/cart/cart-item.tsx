import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import CIcon from '../shared/custom-icon';
import AmountPicker from '../product-detail/amount-picker';
import { CartItem as CartItemModel } from '@lamia/models/cart-item';
import { moneyFormat } from '@lamia/utils/helpers';
import { useAppDispatch } from '@lamia/hooks/context';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '@lamia/redux/slices/cartSlice';
import { TouchableOpacity } from 'react-native';

interface CartItemProps extends BoxProps<Theme> {
  data: CartItemModel;
}

const CartItem = ({ data, ...props }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const { product, quantity, attribute } = data;

  const removeItem = () => {
    if (!product.id) {
      return;
    }

    dispatch(
      removeFromCart({ attributeId: attribute?.id, productId: product.id }),
    );
  };

  return (
    <Box
      {...props}
      px="3"
      py="4"
      borderBottomColor="gray9"
      borderBottomWidth={1}>
      <Box flexDirection="row">
        <CImage
          defaultSource={Images.noImage}
          source={{ uri: product.image }}
          size={75}
        />
        <Box width={12} />
        <Box flex={1}>
          <Box flexDirection="row">
            <Box flex={1}>
              <Text fontSize={14} fontWeight="500" numberOfLines={2}>
                {product.name}
              </Text>
            </Box>
            <Box width={12} />
            <TouchableOpacity onPress={removeItem}>
              <CIcon image={Images.trash} size={20} />
            </TouchableOpacity>
          </Box>

          <Box my="1.5" flexDirection="row" alignItems="center">
            {/* <Box
              width={12}
              height={12}
              borderRadius="rounded12"
              style={{ backgroundColor: 'blue' }}
              mr="1.5"
            />

            <Text fontSize={12} color="gray5">
              Xanh
            </Text>

            <Box width={1} height={10} bg="gray7" mx="1.5" /> */}

            {attribute && (
              <Text fontSize={12} color="gray5">
                {`Size: ${attribute.title}`}
              </Text>
            )}
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box>
              <Text fontWeight="700" lineHeight={22}>
                {moneyFormat(product.front_sale_price)}
              </Text>
              {product.front_sale_price !== product.original_price && (
                <Box flexDirection="row">
                  <Text
                    fontSize={12}
                    lineHeight={18}
                    color="gray5"
                    textDecorationStyle="solid"
                    textDecorationLine="line-through">
                    {moneyFormat(product.original_price)}
                  </Text>
                  {/* <Text ml="1" fontSize={12} color="red">
                    -99%
                  </Text> */}
                </Box>
              )}
            </Box>

            <AmountPicker
              value={quantity}
              onPick={amount => {
                if (!product.id) {
                  return;
                }

                dispatch(
                  updateCartItemQuantity({
                    attributeId: attribute?.id,
                    productId: product.id,
                    quantity: amount,
                  }),
                );
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
