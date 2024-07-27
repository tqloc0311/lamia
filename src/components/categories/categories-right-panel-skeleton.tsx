import { FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import CategoriesRightPanelSkeletonItem from './categories-right-panel-item-skeleton';
import { Box } from '@lamia/utils/theme';

const NUM_OF_COLUMNS = 3;
const NUM_OF_ITEMS = NUM_OF_COLUMNS * 10;

const CategoriesRightPanelSkeleton = () => {
  const data = useMemo(() => {
    return Array.from({ length: NUM_OF_ITEMS }, (_, index) => index);
  }, []);

  return (
    <Box flex={1}>
      <FlatList
        data={data}
        keyExtractor={itemData => itemData.toString()}
        renderItem={_ => <CategoriesRightPanelSkeletonItem />}
        numColumns={NUM_OF_COLUMNS}
        contentContainerStyle={styles.contentContainer}
      />
    </Box>
  );
};

export default CategoriesRightPanelSkeleton;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
});
