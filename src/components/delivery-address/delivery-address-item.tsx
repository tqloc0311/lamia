import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import { Pressable } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { IAddress } from '@lamia/models/address';

interface DeliveryAddressItemProps extends BoxProps<Theme> {
  selected: boolean;
  data: IAddress;
  hideSelection?: boolean;
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
        {!props.hideSelection && (
          <Box mr="3">
            <CImage
              source={
                props.selected ? Images.radioActive : Images.radioInactive
              }
              size={16}
            />
          </Box>
        )}

        <Box flex={1}>
          <Box flexDirection="row" alignItems="center">
            <Text fontSize={14} fontWeight="700">
              {props.data.name}
            </Text>
            <Box width={1} height={10} bg="primary" mx="3" />
            <Text fontSize={14} color="gray3" fontWeight="400">
              {props.data.phone}
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
              {[
                props.data.address,
                props.data.ward,
                props.data.district,
                props.data.city,
              ].join(', ')}
            </Text>
          </Box>

          {!!props.data.default_address && (
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
