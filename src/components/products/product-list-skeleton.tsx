import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductTileSkeleton from './product-tile-skeleton';

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
      style={styles.list}
      renderItem={() => <ProductTileSkeleton />}
      contentContainerStyle={styles.listContent}
      numColumns={2}
      columnWrapperStyle={styles.column}
      scrollEnabled={false}
    />
  );
};

export default ProductCollectionListSkeleton;

const styles = StyleSheet.create({
  list: {
    marginTop: 12,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  column: {
    gap: 12,
  },
});
