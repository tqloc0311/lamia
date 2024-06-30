import React, { useCallback, useState } from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import ProductDetail from '@lamia/components/product-detail/product-detail';
import { Box } from '@lamia/utils/theme';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ProductDetailScreen = () => {
  const HALF_BOTTOM_SHEET_VIEW = 150;
  const HANDLE_HEIGHT = 17;

  const heightAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);

  const handleSheetChanges = useCallback((index: number) => {
    heightAnimation.value = withTiming(index == 1 ? 0 : HANDLE_HEIGHT, {
      duration: 200,
      easing: Easing.bounce,
    });
    opacityAnimation.value = withTiming(index == 1 ? 0 : 1, { duration: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnimation.value,
      opacity: opacityAnimation.value,
    };
  });

  const renderHandleComponent = () => {
    return (
      <Animated.View style={[{ width: '100%' }, animatedStyle]}>
        <Box
          bg="transparent"
          height={HANDLE_HEIGHT}
          justifyContent="center"
          alignItems="center">
          <Box height={1} width={40} bg="primary" />
        </Box>
      </Animated.View>
    );
  };

  return (
    <Box flex={1} bg="white">
      <Box style={{ marginBottom: HALF_BOTTOM_SHEET_VIEW - HANDLE_HEIGHT }}>
        <CImage source={Images.test.girl1} resizeMode="stretch" />
      </Box>
      <BottomSheet
        handleComponent={renderHandleComponent}
        style={styles.bottomSheet}
        // backgroundComponent={null}
        snapPoints={[HALF_BOTTOM_SHEET_VIEW, '100%']}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <ProductDetail />
        </BottomSheetScrollView>
      </BottomSheet>
    </Box>
  );
};

export default ProductDetailScreen;
