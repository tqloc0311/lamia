import React, { useRef } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CButton from '@lamia/components/shared/custom-button';
import {
  AppStackParams,
  NativeStackNavigationBaseType,
} from '@lamia/navigation/types';
import { ScrollView } from 'react-native';
import CTextInput from '@lamia/components/shared/custom-text-input';
import Dropdown from '@lamia/components/shared/dropdown';

type EditDeliveryAddressProps = RouteProp<
  AppStackParams,
  'EditDeliveryAddress'
>;

const EditDeliveryAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();
  const route = useRoute<EditDeliveryAddressProps>();

  const cityDropDownRef = useRef<any>();
  const districtDropDownRef = useRef<any>();
  const wardDropDownRef = useRef<any>();

  const cities = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Hồ Chí Minh' },
  ];

  const districts = [
    { id: 1, name: 'Quận 1' },
    { id: 2, name: 'Quận 2' },
  ];

  const wards = [
    { id: 1, name: 'Phường 1' },
    { id: 2, name: 'Phường 2' },
  ];

  const address = route.params?.address;

  navigation.setOptions({
    headerTitle: address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới',
    headerRight: () => renderSubmitButton(),
  });

  const renderSubmitButton = () => {
    return (
      <Box>
        <CButton onPress={() => submit()}>
          {address ? 'Cập nhật' : 'Thêm'}
        </CButton>
      </Box>
    );
  };

  const submit = () => {
    navigation.pop();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}>
      <Box flex={1} px="3" py="4" gap="6" bg="white">
        <Box gap="2.5">
          <Text fontWeight="700">Người nhận</Text>

          <CTextInput
            placeholder="Nhập tên người nhận"
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
          />
        </Box>

        <Box gap="2.5">
          <Text fontWeight="700">Số điện thoại</Text>

          <CTextInput
            placeholder="Nhập số điện thoại người nhận"
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
          />
        </Box>

        <Box gap="2.5">
          <Text fontWeight="700">Tỉnh/Thành phố</Text>

          <Dropdown
            ref={cityDropDownRef}
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
            data={cities}
            placeholder="Tỉnh/Thành phố"
            titleKey="name"
            onSelect={() => {
              wardDropDownRef.current?.clearSelected();
              districtDropDownRef.current?.clearSelected();
            }}
          />
        </Box>

        <Box gap="2.5">
          <Text fontWeight="700">Quận/Huyện</Text>

          <Dropdown
            ref={districtDropDownRef}
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
            data={districts}
            placeholder="Quận/Huyện"
            titleKey="name"
            onSelect={() => {
              wardDropDownRef.current?.clearSelected();
            }}
          />
        </Box>

        <Box gap="2.5">
          <Text fontWeight="700">Phường/Xã</Text>

          <Dropdown
            ref={wardDropDownRef}
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
            data={wards}
            placeholder="Phường/Xã"
            titleKey="name"
          />
        </Box>

        <Box gap="2.5">
          <Text fontWeight="700">Địa chỉ</Text>

          <CTextInput
            placeholder="Số nhà, tên đường, tên khu vực"
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default EditDeliveryAddressScreen;
