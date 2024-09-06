import React, { useEffect, useMemo } from 'react';
import CartStepsView from '../../components/cart/cart-steps-view';
import CartBottomButton from '../../components/cart/cart-bottom-button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';
import { FlatList, StyleSheet } from 'react-native';
import CartItem from '@lamia/components/cart/cart-item';
import CartSummary from '@lamia/components/cart/cart-summary';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { CartItem as CartItemModel } from '@lamia/models/cart-item';
import { fetchShippingOptions } from '../place-order/actions';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { cartItems, shippingOptions } = useAppSelector(state => state.cart);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + (item.product.front_sale_price || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  useEffect(() => {
    dispatch(fetchShippingOptions(totalPrice));
  }, [totalPrice, dispatch]);

  const renderNoCart = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="50%" aspectRatio={1}>
          <CImage source={Images.noCart} resizeMode="contain" />
        </Box>
        <Text fontSize={20} fontWeight="700" mt="6" mb="4">
          Giỏ hàng trống
        </Text>
        <Text color="gray2" fontSize={12}>
          Hiện tại bạn đang không có đơn hàng nào!
        </Text>
      </Box>
    );
  };

  const renderItem = (item: CartItemModel) => {
    return <CartItem data={item} />;
  };

  const renderCartList = () => {
    return (
      <Box flex={1}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={cartItems}
          renderItem={itemData => renderItem(itemData.item)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      </Box>
    );
  };

  return (
    <Box flex={1} bg="white">
      <CartStepsView step={0} />

      <Box flex={1}>
        {cartItems.length === 0 ? renderNoCart() : renderCartList()}
      </Box>
      <Box
        bg="white"
        shadowColor="black"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={3}>
        {cartItems.length > 0 && (
          <CartSummary
            total={totalPrice}
            discount={0}
            shipping={shippingOptions.find(item => !!item.default)?.price || 0}
          />
        )}
        <CartBottomButton
          buttonTitle={
            cartItems.length > 0
              ? `Đặt hàng (${cartItems.reduce(
                  (acc, item) => acc + item.quantity,
                  0,
                )})`
              : 'Tiếp tục mua sắm'
          }
          onPress={() => {
            if (cartItems.length > 0) {
              navigation.navigate('CartDeliveryAddress');
            } else {
              navigation.pop();
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  list: {},
  listContent: {},
});
