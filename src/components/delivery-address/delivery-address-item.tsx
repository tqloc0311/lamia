import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import { Pressable } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';

interface DeliveryAddressItemProps extends BoxProps<Theme> {
  selected: boolean;
  default: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

const DeliveryAddressItem = (props: DeliveryAddressItemProps) => {
  return (
    <Pressable onPress={props.onSelect}>
      <Box
        flexDirection="row"
        m="3"
        borderBottomColor="gray8"
        borderBottomWidth={1}>
        <CImage
          source={props.selected ? Images.radioActive : Images.radioInactive}
          size={16}
          mr="3"
        />

        <Box flex={1}>
          <Box flexDirection="row" alignItems="center">
            <Text fontSize={14} fontWeight="700">
              John Doe
            </Text>
            <Box width={1} height={10} bg="primary" mx="3" />
            <Text fontSize={14} color="gray3" fontWeight="400">
              0909 123 456
            </Text>
            <Box flex={1} />
            <Pressable onPress={props.onEdit}>
              <Text fontSize={14} fontWeight="400" color="red">
                Sửa
              </Text>
            </Pressable>
          </Box>
          <Box my="2">
            <Text fontSize={12} color="gray3" fontWeight="400">
              Test, Phường 03, Đường D1, Khu Công Nghệ Cao Phường Tân Phú, Thành
              Phố Thủ Đức
            </Text>
          </Box>

          {props.default && (
            <Box
              px="1.5"
              borderWidth={1}
              borderColor="primary"
              alignSelf="flex-start"
              mb="3">
              <Text
                color="gray3"
                fontSize={12}
                lineHeight={18}
                fontWeight="400">
                Địa chỉ mặc định
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Pressable>
  );
};

export default DeliveryAddressItem;
