import React, { useState } from 'react';
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
import Dropdown from '@lamia/components/shared/dropdown';

const paymentMethods = [
  { id: 1, title: 'Thu tiền tận nơi' },
  { id: 2, title: 'Thanh toán bằng thẻ tín dụng (One Pay)' },
  { id: 3, title: 'Thanh toán bằng thẻ ATM (One Pay)' },
  { id: 4, title: 'Thanh toán bằng Apple Pay' },
];

const supporters = [
  { id: 1, name: 'Supporter 1' },
  { id: 2, name: 'Supporter 2' },
  { id: 3, name: 'Supporter 3' },
  { id: 4, name: 'Supporter 4' },
  { id: 5, name: 'Supporter 5' },
  { id: 6, name: 'Supporter 6' },
  { id: 7, name: 'Supporter 7' },
  { id: 8, name: 'Supporter 8' },
];

interface PlaceOrderProps {}

const PlaceOrderScreen = (_: PlaceOrderProps) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const cartItemsCount = 2;

  const [vatReceipt, setVatReceipt] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(1);

  const renderPaymentItem = (id: number, title: string) => {
    return (
      <Pressable onPress={() => setPaymentMethodId(id)}>
        <Box flexDirection="row" alignItems="center">
          <CImage
            source={
              paymentMethodId == id ? Images.radioActive : Images.radioInactive
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
              />
            </Box>
            <CButton outline>Áp dụng</CButton>
          </Box>

          <Box height={10} />

          <Dropdown
            data={supporters}
            titleKey="name"
            placeholder="Mã nhân viên hỗ trợ"
            onSelect={(item: any) => {
              console.log(item);
            }}
          />

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
            {paymentMethods.map(item => renderPaymentItem(item.id, item.title))}
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
        <CartSummary total={2000000} discount={100000} />
        <CartBottomButton
          buttonTitle={`Đặt hàng (${cartItemsCount})`}
          onPress={() => navigation.getParent()?.goBack()}
        />
      </Box>
    </Box>
  );
};

export default PlaceOrderScreen;
