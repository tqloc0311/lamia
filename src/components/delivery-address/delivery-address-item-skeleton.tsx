import React from 'react';
import { Box, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import { useSkeletonAnimation } from '@lamia/hooks/use-skeleton-animation';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { Colors } from '@lamia/utils/theme/colors';

interface DeliveryAddressItemSkeletonProps extends BoxProps<Theme> {}

const DeliveryAddressItemSkeleton = ({}: DeliveryAddressItemSkeletonProps) => {
  const animatedStyle = useSkeletonAnimation({
    targetOpacityValue: 0.5,
    speed: 800,
  });

  return (
    <Box
      flexDirection="row"
      m="3"
      borderBottomColor="gray8"
      borderBottomWidth={1}>
      <Box flex={1}>
        <Box flexDirection="row" alignItems="center">
          <Animated.View style={[styles.name, animatedStyle]} />
          <Box width={1} height={10} bg="gray8" mx="3" />
          <Animated.View style={[styles.phone, animatedStyle]} />
          <Box flex={1} />
          <Animated.View style={[styles.edit, animatedStyle]} />
        </Box>
        <Box my="2">
          <Animated.View style={[styles.address1, animatedStyle]} />
          <Box height={4} />
          <Animated.View style={[styles.address2, animatedStyle]} />
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryAddressItemSkeleton;

const styles = StyleSheet.create({
  name: {
    backgroundColor: Colors.gray8,
    width: 80,
    height: 20,
    borderRadius: 4,
  },
  phone: {
    backgroundColor: Colors.gray8,
    width: 100,
    height: 20,
    borderRadius: 4,
  },
  edit: {
    backgroundColor: Colors.gray8,
    width: 30,
    height: 20,
    borderRadius: 4,
  },
  address1: {
    backgroundColor: Colors.gray8,
    height: 20,
    width: '100%',
    borderRadius: 4,
  },
  address2: {
    backgroundColor: Colors.gray8,
    height: 20,
    width: 50,
    borderRadius: 4,
  },
});
