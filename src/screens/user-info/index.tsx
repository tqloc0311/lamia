import CButton from '@lamia/components/shared/custom-button';
import CImage from '@lamia/components/shared/custom-image';
import CTextInput from '@lamia/components/shared/custom-text-input';
import Popup from '@lamia/components/shared/popup';
import { AppNavigationType } from '@lamia/navigation/types';
import { Images } from '@lamia/utils/images';
import { Box, Text } from '@lamia/utils/theme';
import { Gender } from '@lamia/utils/types';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const UserInfoScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.male);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);
  const [isDeletionPopupVisible, setIsDeletionPopupVisible] = useState(false);

  const renderGenderItem = (gender: Gender, title: string) => {
    return (
      <Pressable onPress={() => setSelectedGender(gender)}>
        <Box flexDirection="row" alignItems="center">
          <CImage
            source={
              selectedGender === gender
                ? Images.radioActive
                : Images.radioInactive
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
    <Box bg="white" flex={1}>
      <Popup
        visible={isDeletionPopupVisible}
        onTouchOutside={() => setIsDeletionPopupVisible(false)}>
        <Box bg="white" px="3" borderRadius="rounded">
          <Text fontWeight="700">Xóa tài khoản</Text>
          <Text fontWeight="400" color="gray2" mt="2">
            Bạn có chắc chắn muốn xóa tài khoản không?
          </Text>
          <Box flexDirection="row" gap="3" mt="5">
            <Box flex={1}>
              <CButton outline onPress={() => setIsDeletionPopupVisible(false)}>
                Hủy
              </CButton>
            </Box>
            <Box flex={1}>
              <CButton filled onPress={() => setIsDeletionPopupVisible(false)}>
                Xác nhận
              </CButton>
            </Box>
          </Box>
        </Box>
      </Popup>
      <DateTimePickerModal
        isVisible={isSelectingDate}
        mode="date"
        onConfirm={date => {
          setDateOfBirth(date);
          setIsSelectingDate(false);
        }}
        onCancel={() => setIsSelectingDate(false)}
      />
      <Box bg="gray9" px="3" py="4">
        <Text color="gray2" fontWeight="400" fontSize={12}>
          {`Vì chính sách an toàn. Để đổi tên, ngày sinh hoặc SĐT vui lòng liên hệ CSKH: ${'0905898683'} để được hỗ trợ`}
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} px="3" py="4" gap="6">
          <Box gap="2.5">
            <Text fontWeight="700">
              Họ và tên <Text color="red">*</Text>
            </Text>

            <CTextInput
              placeholder="Nguyễn Văn A"
              px="2"
              py="2.5"
              borderWidth={1}
              borderColor="gray6"
              borderRadius="rounded"
            />
          </Box>

          <Box gap="2.5">
            <Text fontWeight="700">Địa chỉ email</Text>

            <CTextInput
              placeholder="nguyenvana@mail.com"
              px="2"
              py="2.5"
              borderWidth={1}
              borderColor="gray6"
              borderRadius="rounded"
            />
          </Box>

          <Box gap="2.5">
            <Text fontWeight="700">Điện thoại (Tài khoản đăng nhập)</Text>

            <CTextInput
              placeholder="0909123456"
              px="2"
              py="2.5"
              borderWidth={1}
              borderColor="gray6"
              borderRadius="rounded"
            />
          </Box>

          <Box gap="2.5">
            <Text fontWeight="700">Ngày sinh</Text>

            <Pressable onPress={() => setIsSelectingDate(true)}>
              <Box
                px="2"
                py="2.5"
                borderWidth={1}
                borderColor="gray6"
                borderRadius="rounded">
                <Text
                  fontWeight="400"
                  color={dateOfBirth ? 'primary' : 'gray6'}>
                  {dateOfBirth
                    ? format(dateOfBirth, 'dd/MM/yyyy')
                    : 'Chọn ngày sinh'}
                </Text>
              </Box>
            </Pressable>
          </Box>

          <Box gap="2.5">
            <Text fontWeight="700">Giới tính</Text>
            <Box flexDirection="row" gap="4">
              <Box>{renderGenderItem(Gender.male, 'Nam')}</Box>
              <Box>{renderGenderItem(Gender.female, 'Nữ')}</Box>
              <Box>{renderGenderItem(Gender.other, 'Khác')}</Box>
            </Box>
          </Box>

          <Box gap="2.5">
            <Text fontWeight="700">Nghề nghiệp</Text>

            <CTextInput
              placeholder="Nhập nghề nghiệp"
              px="2"
              py="2.5"
              borderWidth={1}
              borderColor="gray6"
              borderRadius="rounded"
            />
          </Box>

          <Pressable onPress={() => navigation.navigate('ChangePassword')}>
            <Text
              color="blurDark1"
              fontWeight="400"
              lineHeight={21}
              textDecorationLine="underline">
              Thay đổi mật khẩu
            </Text>
          </Pressable>
        </Box>
      </ScrollView>
      <Box gap="3" p="3">
        <CButton filled>Cập nhật thông tin</CButton>
        <CButton outline onPress={() => setIsDeletionPopupVisible(true)}>
          Xóa tài khoản
        </CButton>
      </Box>
    </Box>
  );
};

export default UserInfoScreen;
