import { StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Box } from '@lamia/utils/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CategoriesLeftPanel from '../../components/categories/categories-left-panel';
import { mockData } from '../../models/category';
import CategoriesRightPanel from '../../components/categories/categories-right-panel';
import { getMockSubCategories } from '../../models/sub-category';

const CategoriesScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const containerStyle: ViewStyle = {
    ...styles.container,
    marginBottom: tabBarHeight,
  };

  return (
    <Box flex={1} flexDirection="row" style={containerStyle} bg="white">
      <CategoriesLeftPanel
        didSelectCategory={category => {
          console.log('CategoriesScreen', category?.title);
        }}
        categories={mockData}
        style={styles.leftPanel}
      />
      <CategoriesRightPanel subCategories={getMockSubCategories()} />
    </Box>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {},
  leftPanel: {
    width: 90,
  },
});
