import React, { useEffect, useMemo, useState } from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import CartStepsView from '../../components/cart/cart-steps-view';
import CartBottomButton from '../../components/cart/cart-bottom-button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CartSummary from '@lamia/components/cart/cart-summary';
import CTextInput from '@lamia/components/shared/custom-text-input';
import CButton from '@lamia/components/shared/custom-button';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';
import Switch from '@lamia/components/shared/switch';
import { Pressable } from 'react-native';
import { useTheme } from '@shopify/restyle';
import DismissKeyboardView from '@lamia/components/shared/dismiss-keyboard-view';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Spinner from 'react-native-loading-spinner-overlay';
import { checkCoupon, fetchShippingOptions, makeOrder } from './actions';
import { OrderProduct } from '@lamia/models/product-attribute';
import ToastHelper from '@lamia/utils/toast-helper';

interface PlaceOrderProps {}

const PlaceOrderScreen = (_: PlaceOrderProps) => {
  const theme = useTheme<Theme>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { deliveryAddress, cartItems, discount, shippingOptions } =
    useAppSelector(state => state.cart);
  const { loading } = useAppSelector(state => state.placeOrderScreen);
  const { paymentMethods } = useAppSelector(state => state.global);
  const cartItemsCount = useMemo(() => cartItems.length, [cartItems]);
  const orderTotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + (item.product.front_sale_price || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const defaultShippingOption = useMemo(() => {
    return (
      shippingOptions.find(item => !!item.default) || shippingOptions.at(0)
    );
  }, [shippingOptions]);

  const [couponCode, setCouponCode] = useState('');
  const [vatReceipt, setVatReceipt] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchShippingOptions(orderTotal));
  }, [orderTotal, dispatch]);

  useEffect(() => {
    if (!paymentMethodId) {
      setPaymentMethodId(paymentMethods.find(item => !!item.default)?.id);
    }
  }, [paymentMethods, paymentMethodId]);

  const placeOrder = () => {
    if (!deliveryAddress || !defaultShippingOption || !paymentMethodId) {
      return;
    }
    const products = cartItems.map(
      (item): OrderProduct => ({
        product_id: item.product.id || 0,
        attribute_id: item.attribute.id || 0,
        qty: item.quantity,
        price: item.attributeDetail.front_sale_price,
      }),
    );

    const params = {
      address: { ...deliveryAddress, country: 'VN' },
      shipping_option: defaultShippingOption.id,
      shipping_method: 'default',
      payment_method: paymentMethodId,
      coupon_code: discount?.discount.code || '',
      products,
      description: undefined,
    };
    dispatch(
      makeOrder({
        ...params,
        callback: () => {
          ToastHelper.showToast(
            'Thành công',
            'Tạo đơn hàng thành công!',
            'success',
          );
          navigation.getParent()?.goBack();
        },
      }),
    );
  };

  const onCheckCoupon = () => {
    if (couponCode) {
      dispatch(checkCoupon(couponCode));
    }
  };

  const renderPaymentItem = (id: string, title: string) => {
    return (
      <Pressable onPress={() => setPaymentMethodId(id)} key={id}>
        <Box flexDirection="row" alignItems="center">
          <CImage
            source={
              paymentMethodId === id ? Images.radioActive : Images.radioInactive
            }
            size={16}
          />

          <Text fontWeight="400" fontSize={14} color="gray2" ml="2">
            {title}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg="white">
      <Spinner visible={loading} />
      <CartStepsView step={2} />
      <DismissKeyboardView>
        <Box flex={1} py="4" px="3">
          <Box>
            <Text fontWeight="700" fontSize={16}>
              Mã phiếu giảm giá
            </Text>
          </Box>
          <Box height={12} />
          <Box flexDirection="row" gap="2.5">
            <Box
              flex={1}
              borderRadius="rounded4"
              borderWidth={1}
              borderColor="gray7"
              px="2"
              py="1.5">
              <CTextInput
                placeholder="Nhập mã giảm giá"
                placeholderTextColor={theme.colors.gray5}
                value={couponCode}
                onChangeText={setCouponCode}
              />
            </Box>
            <CButton outline onPress={onCheckCoupon}>
              Áp dụng
            </CButton>
          </Box>

          <Box height={10} />

          <Box flexDirection="row" alignItems="center" my="5">
            <Switch value={vatReceipt} onValueChanged={setVatReceipt} />
            <Text color="gray2" fontWeight="400" ml="2.5">
              Nhận hóa đơn VAT
            </Text>
          </Box>

          <Box>
            <Text fontWeight="700" fontSize={16}>
              Phương thức thanh toán
            </Text>
          </Box>

          <Box height={12} />

          <Box gap="2">
            {paymentMethods.map(item => renderPaymentItem(item.id, item.name))}
          </Box>
        </Box>
      </DismissKeyboardView>
      <Box
        bg="white"
        shadowColor="black"
        shadowOffset={{ width: 0, height: -4 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={3}>
        <CartSummary
          total={orderTotal}
          discount={discount?.discount_amount || 0}
          shipping={defaultShippingOption?.price || 0}
        />
        <CartBottomButton
          disabled={loading}
          buttonTitle={`Đặt hàng (${cartItemsCount})`}
          onPress={placeOrder}
        />
      </Box>
    </Box>
  );
};

export default PlaceOrderScreen;
