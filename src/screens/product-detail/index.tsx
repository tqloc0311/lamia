/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ProductDetail from '@lamia/components/product-detail/product-detail';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '@lamia/components/shared/custom-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParams } from '@lamia/navigation/types';
import Carousel from 'react-native-reanimated-carousel';
import Layout from '@lamia/constants/Layout';
import { BarIndicator } from 'react-native-indicators';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { useEffectOnce } from 'react-use';
import { fetchProductDetail } from './actions';

type ProductDetailScreenScreenProps = RouteProp<
  AppStackParams,
  'ProductDetail'
>;

const PAGE_WIDTH = Layout.window.width;

const ProductDetailScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<ProductDetailScreenScreenProps>();
  const { productId } = route.params ?? {};

  const { product, loading } = useAppSelector(
    state => state.productDetailScreen,
  );

  useEffectOnce(() => {
    dispatch(fetchProductDetail(productId));
  });

  const images: any = useMemo(
    () =>
      product?.images?.map(item => {
        return {
          uri: item,
        };
      }) || [],
    [product],
  );

  const HALF_BOTTOM_SHEET_VIEW = 170;
  const HANDLE_HEIGHT = 17;

  const heightAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);

  const handleSheetChanges = useCallback(
    (index: number) => {
      heightAnimation.value = withTiming(index === 1 ? 0 : HANDLE_HEIGHT, {
        duration: 200,
        easing: Easing.bounce,
      });
      opacityAnimation.value = withTiming(index === 1 ? 0 : 1, {
        duration: 100,
      });
    },
    [heightAnimation, opacityAnimation],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnimation.value,
      opacity: opacityAnimation.value,
    };
  });

  const renderHandleComponent = () => {
    return (
      <Animated.View style={[styles.handleWrapper, animatedStyle]}>
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
      {loading && <BarIndicator />}
      {!product && !loading && (
        <Box justifyContent="center" alignItems="center" flex={1}>
          <Text>Data not found</Text>
        </Box>
      )}
      {!loading && product && (
        <Box flex={1}>
          <Box
            flex={1}
            style={{
              marginBottom: HALF_BOTTOM_SHEET_VIEW - HANDLE_HEIGHT,
            }}>
            <Carousel
              loop
              data={images}
              renderItem={({ index }) => {
                const uri = images[index];
                return <CImage key={uri} source={uri} resizeMode="stretch" />;
              }}
              style={{ width: PAGE_WIDTH }}
              width={PAGE_WIDTH}
            />
          </Box>
          <BottomSheet
            handleComponent={renderHandleComponent}
            style={styles.bottomSheet}
            // backgroundComponent={null}
            snapPoints={[HALF_BOTTOM_SHEET_VIEW, '100%']}
            onChange={handleSheetChanges}>
            <BottomSheetScrollView style={styles.contentContainer}>
              <ProductDetail product={product} />
            </BottomSheetScrollView>
          </BottomSheet>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  handleWrapper: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.05,
  },
  bottomSheet: {},
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
});
