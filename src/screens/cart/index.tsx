import React from 'react';
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
import { useAppSelector } from '@lamia/hooks/context';

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { cartItems } = useAppSelector(state => state.cart);
  let cartItemsCount = cartItems.length;

  const data = [...Array(cartItemsCount)].map((_, i) => i + 1);

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

  const renderItem = (_: any) => {
    return <CartItem />;
  };

  const renderCartList = () => {
    return (
      <Box flex={1}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={renderItem}
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
        {cartItemsCount === 0 ? renderNoCart() : renderCartList()}
      </Box>
      <Box
        bg="white"
        shadowColor="black"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={3}>
        {cartItemsCount > 0 && (
          <CartSummary total={2000000} discount={100000} />
        )}
        <CartBottomButton
          buttonTitle={
            cartItemsCount > 0
              ? `Đặt hàng (${cartItemsCount})`
              : 'Tiếp tục mua sắm'
          }
          onPress={() => {
            if (cartItemsCount > 0) {
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
