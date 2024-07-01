import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CTextInput from '@lamia/components/shared/custom-text-input';
import { AppNavigationType } from '@lamia/navigation/types';
import { useNavigation } from '@react-navigation/native';
import CButton from '@lamia/components/shared/custom-button';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { changePassword } from './actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native';

const ChangePasswordScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);

  navigation.setOptions({
    headerRight: () => renderSubmitButton(),
  });

  const renderSubmitButton = () => {
    return (
      <Box>
        <CButton onPress={() => submit()}>Cập nhật</CButton>
      </Box>
    );
  };

  const submit = () => {
    dispatch(changePassword())
      .then(() => navigation.pop())
      .catch(error => {
        Alert.alert('Lỗi', `Đã có lỗi xảy ra. Vui lòng thử lại sau.\n${error}`);
      });
  };

  return (
    <Box bg="white" flex={1} px="3" py="4" gap="6">
      <Spinner
        visible={isLoading}
        textContent={'Đang xử lý...'}
        textStyle={{ color: 'white' }}
      />
      <Box gap="2.5">
        <Text fontWeight="700">Mật khẩu cũ</Text>

        <CTextInput
          placeholder="Nhập mật khẩu cũ"
          secureTextEntry
          px="2"
          py="2.5"
          borderWidth={1}
          borderColor="gray6"
          borderRadius="rounded"
        />
      </Box>

      <Box gap="2.5">
        <Text fontWeight="700">Mật khẩu mới</Text>

        <CTextInput
          placeholder="Nhập mật khẩu mới"
          secureTextEntry
          px="2"
          py="2.5"
          borderWidth={1}
          borderColor="gray6"
          borderRadius="rounded"
        />
      </Box>

      <Box gap="2.5">
        <Text fontWeight="700">Xác nhận mật khẩu mới</Text>

        <CTextInput
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry
          px="2"
          py="2.5"
          borderWidth={1}
          borderColor="gray6"
          borderRadius="rounded"
        />
      </Box>
    </Box>
  );
};

export default ChangePasswordScreen;
