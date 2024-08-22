import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { StyleSheet } from 'react-native';
import { Colors } from '@lamia/utils/theme/colors';
import { useSkeletonAnimation } from '@lamia/hooks/use-skeleton-animation';
import Animated from 'react-native-reanimated';

const ProductCollectionTileSkeleton = () => {
  const skeletonAnimatedStyle = useSkeletonAnimation({
    targetOpacityValue: 0.5,
    speed: 300,
  });

  return (
    <Box style={styles.pressable}>
      <Box flex={1} p="1" alignItems="center">
        <Box
          mb="1"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flex={1}>
          <Animated.View style={[styles.image, skeletonAnimatedStyle]} />
        </Box>
      </Box>
      <Box height={16}>
        <Text
          fontSize={12}
          fontWeight="400"
          lineHeight={14}
          textAlign="center"
        />
      </Box>
    </Box>
  );
};

export default ProductCollectionTileSkeleton;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  image: {
    borderRadius: 200,
    aspectRatio: 1,
    height: '100%',
    backgroundColor: Colors.gray8,
  },
});
