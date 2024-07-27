import { StyleSheet, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box } from '@lamia/utils/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CategoriesLeftPanel from '../../components/categories/categories-left-panel';
import CategoriesRightPanel from '../../components/categories/categories-right-panel';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Category from '@lamia/models/category';
import { fetchChildrenCategories } from './actions';
import CategoriesRightPanelSkeleton from '@lamia/components/categories/categories-right-panel-skeleton';

const CategoriesScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const loading = useAppSelector(state => state.categories.loading);
  const childrenCategories = useAppSelector(
    state => state.categories.childrenCategories,
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(categories[0]);

  const containerStyle: ViewStyle = {
    ...styles.container,
    marginBottom: tabBarHeight,
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchSubCategories = (parentId: number) => {
    dispatch(fetchChildrenCategories(parentId));
  };

  return (
    <Box flex={1} flexDirection="row" style={containerStyle} bg="white">
      <CategoriesLeftPanel
        didSelectCategory={setSelectedCategory}
        categories={categories}
        style={styles.leftPanel}
      />
      {!loading &&
        selectedCategory &&
        childrenCategories[selectedCategory.id] && (
          <CategoriesRightPanel
            categories={childrenCategories[selectedCategory.id]}
          />
        )}
      {loading && <CategoriesRightPanelSkeleton />}
    </Box>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {},
  leftPanel: {
    width: 100,
  },
});
