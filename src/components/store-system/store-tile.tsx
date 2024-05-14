import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { Pressable } from 'react-native';

interface StoreTileProps {}

const StoreTile = (props: StoreTileProps) => {
  return (
    <Box py="4" borderBottomColor="gray8" borderBottomWidth={1} gap="2">
      <Text fontWeight="700">Lamia HCM</Text>

      <Box flexDirection="row" gap="2">
        <CImage source={Images.marker} size={20} color="gray2" />
        <Box flex={1}>
          <Text color="gray2" fontWeight="400" lineHeight={21}>
            Lô 02-33 Tầng 2, TTTM Vivo City, Lầu 2, 1058 Nguyễn Văn Linh, P. Tân
            Phong
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" gap="2">
        <CImage source={Images.clock} size={20} color="gray2" />
        <Box flex={1}>
          <Text color="gray2" fontWeight="400" lineHeight={21}>
            9:00 - 22:00
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" gap="2">
        <CImage source={Images.phone} size={20} color="gray2" />
        <Box flex={1}>
          <Text color="gray2" fontWeight="400" lineHeight={21}>
            0909.123.456
          </Text>
        </Box>

        <Pressable>
          <Text
            color="blurDark1"
            fontWeight="400"
            lineHeight={21}
            textDecorationLine="underline">
            Xem bản đồ
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default StoreTile;
