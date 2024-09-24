import { useSkeletonAnimation } from '@lamia/hooks/use-skeleton-animation';
import { Box } from '@lamia/utils/theme';
import { Colors } from '@lamia/utils/theme/colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const OrderTileSkeleton = () => {
  const skeletonAnimatedStyle = useSkeletonAnimation({
    targetOpacityValue: 0.5,
    speed: 500,
  });

  return (
    <Box p="3" flex={1}>
      <Box flexDirection="row">
        <Animated.View
          style={[styles.row, { width: '30%' }, skeletonAnimatedStyle]}
        />
        <Box flex={1} />

        <Animated.View
          style={[styles.row, { width: '20%' }, skeletonAnimatedStyle]}
        />
      </Box>

      <Box backgroundColor="gray200" width="100%" height={1} my="2.5" />

      <Box flexDirection="row">
        <Animated.View style={[styles.image, skeletonAnimatedStyle]} />

        <Box width={12} />

        <Box flex={1} height="100%">
          <Box flex={1}>
            <Animated.View
              style={[styles.row, { width: '100%' }, skeletonAnimatedStyle]}
            />
            <Box height={4} />
            <Animated.View
              style={[styles.row, { width: '20%' }, skeletonAnimatedStyle]}
            />
          </Box>
          <Box height={6} />
          <Box flexDirection="row">
            <Animated.View
              style={[styles.row, { width: '30%' }, skeletonAnimatedStyle]}
            />
            <Box flex={1} />
            <Animated.View
              style={[styles.row, { width: '30%' }, skeletonAnimatedStyle]}
            />
          </Box>
        </Box>
      </Box>

      <Box backgroundColor="gray200" width="100%" height={1} my="2.5" />

      <Box flexDirection="row">
        <Box flex={1} />
        <Animated.View
          style={[styles.row, { width: '50%' }, skeletonAnimatedStyle]}
        />
      </Box>
    </Box>
  );
};

export default OrderTileSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: Colors.gray6,
    aspectRatio: 1,
    width: 64,
  },
  row: {
    backgroundColor: Colors.gray6,
    height: 18,
  },
  box20: {
    backgroundColor: Colors.gray6,
    height: 20,
    width: 20,
  },
});
