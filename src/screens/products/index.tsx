import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@lamia/utils/theme';
import ProductCollection from '@lamia/components/products/product-collection';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ProductList from '@lamia/components/products/product-list';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParams } from '@lamia/navigation/types';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { useEffectOnce } from 'react-use';
import { fetchProducts } from './actions';
import { reset } from './store';
import ProductCollectionListSkeleton from '@lamia/components/products/product-list-skeleton';

const PRODUCT_COLLECTION_HEIGHT = 100;

type ProductsScreenScreenProps = RouteProp<AppStackParams, 'Products'>;

const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<ProductsScreenScreenProps>();
  const { categoryId = 0 } = route.params ?? {};
  const { products, loading, totalProducts, hasMoreData, isFetchingMore } =
    useAppSelector(state => state.productsScreen);
  const promotionItems = useAppSelector(
    state => state.categories.promotionCategories,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | undefined
  >(undefined);
  const page = useRef(1);

  const selectedCategoryId = useMemo(
    () =>
      selectedSubCategoryId && selectedSubCategoryId > 0
        ? selectedSubCategoryId
        : categoryId,
    [selectedSubCategoryId, categoryId],
  );

  useEffectOnce(() => {
    refresh();
  });

  useEffect(() => {
    if (selectedCategoryId) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

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

  const refresh = () => {
    page.current = 1;
    dispatch(fetchProducts({ categoryId: selectedCategoryId, page: 1 }));
  };

  const fetchMore = () => {
    if (!hasMoreData || isFetchingMore) {
      return;
    }

    page.current = page.current + 1;
    dispatch(
      fetchProducts({ categoryId: selectedCategoryId, page: page.current }),
    );
  };

  return (
    <Box flex={1} bg="white">
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <ProductCollection
          categories={promotionItems}
          style={{ height: PRODUCT_COLLECTION_HEIGHT }}
          selectedId={selectedSubCategoryId}
          onSelect={category => {
            setSelectedSubCategoryId(prev =>
              prev === category.id ? -1 : category.id,
            );
          }}
        />
      </Animated.View>
      {!loading && (
        <ProductList
          data={products}
          onScroll={scrollHandler}
          numOfProducts={totalProducts}
          onRefresh={refresh}
          onEndReached={fetchMore}
          showFilter
        />
      )}
      {loading && <ProductCollectionListSkeleton numOfItems={8} />}
    </Box>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
