import React from 'react';
import { Box } from '@lamia/utils/theme';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { Colors } from '@lamia/utils/theme/colors';
import { useSkeletonAnimation } from '@lamia/hooks/use-skeleton-animation';

const CategoriesRightPanelItemSkeleton = () => {
  const animatedStyle = useSkeletonAnimation({
    targetOpacityValue: 0.5,
    speed: 800,
  });

  return (
    <Box flex={1} p="1" alignItems="center">
      <Animated.View style={[styles.thumbnail, animatedStyle]} />

      <Animated.View style={[styles.text, animatedStyle]} />
    </Box>
  );
};

export default CategoriesRightPanelItemSkeleton;

const styles = StyleSheet.create({
  thumbnail: {
    height: 64,
    width: 64,
    backgroundColor: Colors.gray8,
    marginBottom: 4,
    borderRadius: 999,
  },
  text: {
    height: 12,
    width: '100%',
    marginHorizontal: 4,
    backgroundColor: Colors.gray8,
    marginBottom: 4,
    borderRadius: 4,
  },
});
