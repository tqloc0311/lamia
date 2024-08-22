import { StyleSheet, ViewStyle } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@lamia/utils/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CategoriesLeftPanel from '../../components/categories/categories-left-panel';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Category from '@lamia/models/category';
import { fetchChildrenCategories } from './actions';
import ProductCollection from '@lamia/components/products/product-collection';
import ProductCollectionListSkeleton from '@lamia/components/products/product-list-skeleton';
import ProductList from '@lamia/components/products/product-list';
import { reset } from './store';

const CategoriesScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const categoriesLoading = useAppSelector(state => state.categories.loading);
  const childrenCategories = useAppSelector(
    state => state.categories.childrenCategories,
  );
  const { products, loading, totalProducts, hasMoreData, isFetchingMore } =
    useAppSelector(state => state.categoriesScreen);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(categories[0]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | undefined
  >(undefined);
  const page = useRef(1);

  const selectedCategoryId = useMemo(
    () =>
      selectedSubCategoryId && selectedSubCategoryId > 0
        ? selectedSubCategoryId
        : selectedCategory?.id,
    [selectedSubCategoryId, selectedCategory],
  );

  const showCategoryLoading: boolean = useMemo(() => {
    return selectedCategoryId === undefined;
  }, [selectedCategoryId]);

  const containerStyle: ViewStyle = {
    ...styles.container,
    marginBottom: tabBarHeight,
  };

  useEffect(() => {
    if (selectedCategoryId) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  useEffect(() => {
    setSelectedSubCategoryId(undefined);
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const fetchSubCategories = (parentId: number, pageNumber: number) => {
    dispatch(
      fetchChildrenCategories({
        parentId,
        page: pageNumber,
        showCategoryLoading,
      }),
    );
  };

  const refresh = () => {
    if (!selectedCategoryId) {
      return;
    }

    page.current = 1;
    fetchSubCategories(selectedCategoryId, 1);
  };

  const fetchMore = () => {
    if (!hasMoreData || isFetchingMore || !selectedCategoryId) {
      return;
    }

    page.current = page.current + 1;
    fetchSubCategories(selectedCategoryId, page.current);
  };

  return (
    <Box flex={1} flexDirection="row" style={containerStyle} bg="white">
      <CategoriesLeftPanel
        didSelectCategory={setSelectedCategory}
        categories={categories}
        style={styles.leftPanel}
      />
      <Box flex={1}>
        {!categoriesLoading &&
          selectedCategory &&
          childrenCategories[selectedCategory.id]?.length > 0 && (
            <ProductCollection
              categories={childrenCategories[selectedCategory.id]}
              style={styles.productCollection}
              selectedId={selectedSubCategoryId}
              onSelect={category => {
                setSelectedSubCategoryId(prev =>
                  prev === category.id ? -1 : category.id,
                );
              }}
            />
          )}
        {/* {categoriesLoading && (
          <ProductCollectionSkeleton
            numOfItems={8}
            style={styles.productCollection}
          />
        )} */}
        {!loading && (
          <ProductList
            data={products}
            numOfProducts={totalProducts}
            onRefresh={refresh}
            onEndReached={fetchMore}
          />
        )}
        {loading && <ProductCollectionListSkeleton numOfItems={8} />}
      </Box>
    </Box>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {},
  leftPanel: {
    width: 100,
  },
  productCollection: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
  },
});
