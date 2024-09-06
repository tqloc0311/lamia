/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Box } from '@lamia/utils/theme';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@lamia/utils/theme/colors';
import Animated from 'react-native-reanimated';
import { useSkeletonAnimation } from '@lamia/hooks/use-skeleton-animation';

const ProductTileSkeleton = () => {
  const skeletonAnimatedStyle = useSkeletonAnimation({
    targetOpacityValue: 0.5,
    speed: 500,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, skeletonAnimatedStyle]} />
      <Box height={8} />
      <Box flexDirection="row" alignItems="center">
        <Animated.View
          style={[styles.row12, { width: '20%' }, skeletonAnimatedStyle]}
        />
        <Box flex={1} />
        <Animated.View style={[styles.box20, skeletonAnimatedStyle]} />
      </Box>
      <Box height={8} />
      <Animated.View style={[styles.row, skeletonAnimatedStyle]} />
      <Box height={8} />
      <Animated.View
        style={[styles.row, { width: '50%' }, skeletonAnimatedStyle]}
      />
    </View>
  );
};

export default ProductTileSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: Colors.gray6,
    aspectRatio: 162.0 / 234.0,
    borderRadius: 8,
  },
  row: {
    backgroundColor: Colors.gray6,
    height: 16,
  },
  row12: {
    backgroundColor: Colors.gray6,
    height: 12,
  },
  box20: {
    backgroundColor: Colors.gray6,
    height: 20,
    width: 20,
  },
});
