import React, { useMemo } from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import { Box } from '@lamia/utils/theme';
import ProductCollectionTileSkeleton from './product-collection-tile-skeleton';
import { uniqueId } from 'lodash';

interface ProductCollectionSkeletonProps extends ViewProps {
  numOfItems: number;
}

const ProductCollectionSkeleton = ({
  numOfItems,
  ...viewProps
}: ProductCollectionSkeletonProps) => {
  const data = useMemo(
    () => [...Array(numOfItems)].map((_, i) => i + 1),
    [numOfItems],
  );

  return (
    <Box py="2" width="auto" bg="gray9" {...viewProps}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        horizontal
        data={data}
        keyExtractor={() => uniqueId()}
        renderItem={() => <ProductCollectionTileSkeleton />}
      />
    </Box>
  );
};

export default ProductCollectionSkeleton;

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 16,
    gap: 6,
  },
});
