import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductCollection from '@lamia/components/products/product-collection';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ProductList from '@lamia/components/products/product-list';
import { StyleSheet } from 'react-native';

const PRODUCT_COLLECTION_HEIGHT = 100;

const ProductsScreen = () => {
  const data = [...Array(10)].map((_, i) => i + 1);

  const contentOffsetY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    if (
      event.contentOffset.y >= 0 &&
      event.contentOffset.y <= PRODUCT_COLLECTION_HEIGHT
    ) {
      contentOffsetY.value = event.contentOffset.y;
    } else if (event.contentOffset.y > PRODUCT_COLLECTION_HEIGHT) {
      contentOffsetY.value = PRODUCT_COLLECTION_HEIGHT;
    } else if (event.contentOffset.y < 0) {
      contentOffsetY.value = 0;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: PRODUCT_COLLECTION_HEIGHT - contentOffsetY.value,
    };
  });

  return (
    <Box flex={1} bg="white">
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <ProductCollection style={{ height: PRODUCT_COLLECTION_HEIGHT }} />
      </Animated.View>
      <ProductList data={data} onScroll={scrollHandler} discountShown />
    </Box>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
