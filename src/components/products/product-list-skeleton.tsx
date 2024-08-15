import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCollectionTileSkeleton from './product-tile-skeleton';

interface ProductCollectionListSkeletonProps {
  numOfItems: number;
}
const ProductCollectionListSkeleton = (
  props: ProductCollectionListSkeletonProps,
) => {
  const data = useMemo(
    () => [...Array(props.numOfItems)].map((_, i) => i + 1),
    [props.numOfItems],
  );

  return (
    <FlatList
      data={data}
      renderItem={() => <ProductCollectionTileSkeleton />}
      contentContainerStyle={styles.listContent}
      numColumns={2}
      columnWrapperStyle={styles.column}
      scrollEnabled={false}
    />
  );
};

export default ProductCollectionListSkeleton;

const styles = StyleSheet.create({
  list: {},
  listContent: {
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  column: {
    gap: 12,
  },
});
