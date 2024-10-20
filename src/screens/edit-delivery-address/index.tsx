import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CButton from '@lamia/components/shared/custom-button';
import {
  AppStackParams,
  NativeStackNavigationBaseType,
} from '@lamia/navigation/types';
import { ActivityIndicator, ScrollView } from 'react-native';
import CTextInput from '@lamia/components/shared/custom-text-input';
import Dropdown from '@lamia/components/shared/dropdown';
import { useEffectOnce } from 'react-use';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import {
  addDeliveryAddress,
  deleteAddress,
  editDeliveryAddress,
  fetchCities,
  fetchDistricts,
  setDeliveryAddressDefault,
} from './actions';
import { IAddress, ICity, IDistrict, IWard } from '@lamia/models/address';
import ToastHelper from '@lamia/utils/toast-helper';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@lamia/components/shared/dialog';

type EditDeliveryAddressProps = RouteProp<
  AppStackParams,
  'EditDeliveryAddress'
>;

const EditDeliveryAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();
  const route = useRoute<EditDeliveryAddressProps>();
  const dispatch = useAppDispatch();

  const address = route.params?.address;

  const cityDropDownRef = useRef<any>();
  const districtDropDownRef = useRef<any>();
  const wardDropDownRef = useRef<any>();

  const [selectedCity, setSelectedCity] = useState<ICity | undefined>(
    undefined,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<
    IDistrict | undefined
  >(undefined);
  const [selectedWard, setSelectedWard] = useState<IWard | undefined>(
    undefined,
  );
  const [name, setName] = useState(address?.name || '');
  const [phone, setPhone] = useState(address?.phone || '');
  const [street, setStreet] = useState(address?.address || '');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { loading, cityLoading, districtLoading } = useAppSelector(
    state => state.editDeliveryAddressScreen,
  );

  const { cities, districts } = useAppSelector(state => state.global);

  const wards = useMemo(
    () => selectedDistrict?.wards || [],
    [selectedDistrict],
  );

  useEffect(() => {
    const city = cities.find(item => item.name === address?.city);
    setSelectedCity(city);
  }, [cities, address]);

  useEffect(() => {
    setSelectedDistrict(
      districts.find(item => item.name === address?.district),
    );
  }, [districts, address]);

  useEffect(() => {
    setSelectedWard(wards.find(item => item.Name === address?.ward));
  }, [wards, address]);

  useEffectOnce(() => {
    dispatch(fetchCities());
  });

  const loadDistricts = useCallback(() => {
    if (selectedCity) {
      dispatch(fetchDistricts(selectedCity.id));
    }
  }, [selectedCity, dispatch]);

  useEffect(() => {
    loadDistricts();
  }, [loadDistricts, selectedCity]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới',
      headerRight: () => renderSubmitButton(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    phone,
    selectedCity,
    selectedDistrict,
    selectedWard,
    street,
    address,
  ]);

  const renderSubmitButton = useCallback(() => {
    return (
      <CButton onPress={() => submit()}>
        {address ? 'Cập nhật' : 'Thêm'}
      </CButton>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    phone,
    selectedCity,
    selectedDistrict,
    selectedWard,
    street,
    address,
  ]);

  const validate = () => {
    if (!name) {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập tên người nhận!', 'error');
      return false;
    }
    if (!phone) {
      ToastHelper.showToast(
        'Lỗi',
        'Vui lòng nhập số điện thoại người nhận!',
        'error',
      );
      return false;
    }

    if (!selectedCity) {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập Tỉnh/Thành phố!', 'error');
      return false;
    }

    if (!selectedDistrict) {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập Quận/Huyện!', 'error');
      return false;
    }

    if (!selectedWard) {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập Phường/Xã!', 'error');
      return false;
    }

    if (!street) {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập Địa chỉ!', 'error');
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validate()) {
      return;
    }

    if (!address?.id) {
      const newAddress: Omit<IAddress, 'id'> = {
        name,
        phone,
        city: selectedCity!.name,
        district: selectedDistrict!.name,
        ward: selectedWard!.Name,
        address: street,
        default_address: 1,
      };

      dispatch(
        addDeliveryAddress({
          address: newAddress,
          callback: () => {
            ToastHelper.showToast(
              'Thêm địa chỉ thành công!',
              undefined,
              'success',
            );
            navigation.pop();
          },
        }),
      );
    } else {
      const updatedAddress: IAddress = {
        ...address,
        name,
        phone,
        city: selectedCity!.name,
        district: selectedDistrict!.name,
        ward: selectedWard!.Name,
        address: street,
        default_address: 1,
      };

      dispatch(
        editDeliveryAddress({
          address: updatedAddress,
          callback: () => {
            ToastHelper.showToast(
              'Thêm địa chỉ thành công!',
              undefined,
              'success',
            );
            navigation.pop();
          },
        }),
      );
    }
  };

  const setAsDefault = () => {
    if (address) {
      dispatch(
        setDeliveryAddressDefault({
          addressId: address.id,
          callback: () => {
            navigation.pop();
          },
        }),
      );
    }
  };

  const showDeletePopup = () => {
    setShowDeleteConfirmation(true);
  };

  const deleteAddressHandler = () => {
    if (address) {
      dispatch(
        deleteAddress({
          addressId: address.id,
          callback: () => {
            navigation.pop();
          },
        }),
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}>
      <Spinner visible={loading} textContent={'Đăng xử lý...'} textStyle={{}} />
      <Dialog
        visible={showDeleteConfirmation}
        title="Xác nhận xóa"
        message="Bạn muốn xóa địa chỉ này?"
        confirmText="Xóa"
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={deleteAddressHandler}
      />
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
            value={name}
            onChangeText={text => setName(text)}
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
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </Box>

        <Box gap="2.5">
          <Box flexDirection="row" height={20}>
            <Text fontWeight="700">Tỉnh/Thành phố</Text>
            <Box width={8} />
            {cityLoading && <ActivityIndicator />}
          </Box>

          <Dropdown
            disabled={cityLoading}
            ref={cityDropDownRef}
            px="2"
            py="2.5"
            borderWidth={1}
            borderColor="gray6"
            borderRadius="rounded"
            data={cities}
            placeholder="Tỉnh/Thành phố"
            titleKey="name"
            selectedItem={selectedCity}
            onSelect={(item: ICity) => {
              setSelectedCity(item);
              setSelectedDistrict(undefined);
              setSelectedWard(undefined);
            }}
          />
        </Box>

        <Box gap="2.5">
          <Box flexDirection="row" height={20}>
            <Text fontWeight="700">Quận/Huyện</Text>
            <Box width={8} />
            {districtLoading && <ActivityIndicator />}
          </Box>

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
            selectedItem={selectedDistrict}
            onSelect={(district: IDistrict) => {
              setSelectedDistrict(district);
              setSelectedWard(undefined);
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
            titleKey="Name"
            selectedItem={selectedWard}
            onSelect={(ward: IWard) => {
              setSelectedWard(ward);
            }}
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
            value={street}
            onChangeText={text => setStreet(text)}
          />
        </Box>

        {address?.id && !address?.default_address && (
          <CButton filled onPress={setAsDefault}>
            Đặt làm địa chỉ mặc định
          </CButton>
        )}

        {address?.id && !address?.default_address && (
          <Box>
            <CButton textColor="red" onPress={showDeletePopup}>
              Xóa địa chỉ này
            </CButton>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default EditDeliveryAddressScreen;
